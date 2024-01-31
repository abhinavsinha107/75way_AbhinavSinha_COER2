import express from "express";
import Customer from "../models/customer.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Customer
// name, email, password, location
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, password, } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                message: "Please provide all necessary credentials..."
            })
        }
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({
                message: "Customer already exists...",
            });
        }
        const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const passwordExpression: RegExp =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!passwordExpression.test(password.toString())) {
            return res.status(400).json({
                message: "Enter valid password with uppercase, lowercase, number & @ between range 7-15...",
            });
        }
        if (!emailExpression.test(email.toString())) {
            return res.status(400).json({ message: "Invalid email address type..." });
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const customer = new Customer({
            name, email, password: hashedPassword
        });
        await customer.save();
        return res.status(200).json({
            message: "Customer registered successfully..."
        });
    } catch (err) {
        res.status(500).json({
            message: "Error while registering customer..."
        })
    }
}


// Login User
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all necessary credentials..."
            })
        }
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(400).json({
                message: "Customer does not exist...",
            });
        }
        const validPassword = bcryptjs.compareSync(password, customer.password);
        if (!validPassword) {
            return res.status(403).json({
                message: "Wrong Password...",
            });
        }
        const customerAuthToken = jwt.sign(
            { customerId: customer._id },
            process.env.JWT_SECRET_KEY || "",
            { expiresIn: "40m" }
        );
        const customerRefreshToken = jwt.sign(
            { customerId: customer._id },
            process.env.JWT_REFRESH_SECRET_KEY || "",
            { expiresIn: "1d" }
        );
        res.cookie("customerAuthToken", customerAuthToken, { httpOnly: true });
        res.cookie("customerRefreshToken", customerRefreshToken, { httpOnly: true });
        res.status(200).json({ message: "Login Successfull...", customer, customerId: customer._id, token: customerAuthToken });
    } catch (err) {
        res.status(500).json({
            message: "Unable to login..."
        })
    }
}

// Logout current User
export const logout = async (req: express.Request, res: express.Response) => {
    try {
        res.clearCookie("customerAuthToken");
        res.clearCookie("customerRefreshToken");
        return res.status(200).json({
            message: "Logout Successfull..."
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to logout..."
        })
    }
}