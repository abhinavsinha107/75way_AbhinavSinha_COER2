import express from "express";
import Driver from "../models/driver.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Driver
// name, email, password, location, vehicleType, isActive
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, password, vehicleType } = req.body;
        if (!name || !email || !password || !vehicleType ) {
            res.status(400).json({
                message: "Please provide all necessary credentials..."
            })
        }
        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) {
            return res.status(400).json({
                message: "Driver already exists...",
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
        const driver = new Driver({
            name, email, password: hashedPassword, vehicleType
        });
        await driver.save();
        return res.status(200).json({
            message: "Driver registered successfully..."
        });
    } catch (err) {
        res.status(500).json({
            message: "Error while registering driver..."
        })
    }
}


// Login Driver
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all necessary credentials..."
            })
        }
        const driver = await Driver.findOne({ email });
        if (!driver) {
            return res.status(400).json({
                message: "Driver does not exist...",
            });
        }
        const validPassword = bcryptjs.compareSync(password, driver.password);
        if (!validPassword) {
            return res.status(403).json({
                message: "Wrong Password...",
            });
        }
        const driverAuthToken = jwt.sign(
            { driverId: driver._id },
            process.env.JWT_SECRET_KEY || "",
            { expiresIn: "40m" }
        );
        const driverRefreshToken = jwt.sign(
            { driverId: driver._id },
            process.env.JWT_REFRESH_SECRET_KEY || "",
            { expiresIn: "1d" }
        );
        res.cookie("driverAuthToken", driverAuthToken, { httpOnly: true });
        res.cookie("driverRefreshToken", driverRefreshToken, { httpOnly: true });
        res.status(200).json({ message: "Login Successfull...", driver, driverId: driver._id, token: driverAuthToken });
    } catch (err) {
        res.status(500).json({
            message: "Unable to login..."
        })
    }
}

// Logout current Driver
export const logout = async (req: express.Request, res: express.Response) => {
    try {
        res.clearCookie("driverAuthToken");
        res.clearCookie("driverRefreshToken");
        return res.status(200).json({
            message: "Logout Successfull..."
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to logout..."
        })
    }
}