import express from "express";
import Customer from "../models/customer.model"
import Driver from "../models/driver.model";

export const updateCustomerLocation = async (req: express.Request, res: express.Response) => {
    try {
        await Customer.findByIdAndUpdate(req.customerId, {
            $set: {
                location: req.body.location
            }
        })
        return res.status(201).json({
            message: "Customer's location updated successfully...",
            location: req.body.location
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to update customer's location..."
        })
    }
}

export const getNearbyCabs = async (req: express.Request, res: express.Response) => {
    try {
        const { location } = req.body;
        const drivers = await Driver.find({ location: location })
        return res.status(200).json(drivers)
    } catch (err) {
        return res.status(500).json({
            message: "Unable to fetch nearby cabs..."
        })
    }
}

export const requestRide = async (req: express.Request, res: express.Response) => {
    try {
        const {driverId, location} = req.body;
        const driver = await Driver.findById({_id: driverId});
        if (!driver) {
            return res.status(404).json({
                message: "Driver not found...",
            });
        }
        const request = {
            customerId: req.customerId,
            location: location
        }
        driver.requests.push(request);
        await driver.save();
        return res.status(201).json({
            message: "Ride requested successfully..."
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to request a cab..."
        })
    }
}

export const updateCustomerStatus = async (req: express.Request, res: express.Response) => {
    try {
        const {currentStatus} = req.body;
        const customer = await Customer.findById({_id: req.customerId});
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found...",
            });
        }
        customer.currentStatus = currentStatus;
        await customer.save();
        return res.status(200).json({
            message: "Customer status updated successfully..."
        })
    } catch(err) {
        return res.status(500).json({
            message: "Unable to update customer status..."
        })
    }
}

export const getCustomerStatus = async (req: express.Request, res: express.Response) => {
    try {
        const customer = await Customer.findById({ _id: req.customerId });
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found...",
            });
        }
        return res.status(200).json(customer.currentStatus);
    } catch (err) {
        return res.status(500).json({
            message: "Unable to fetch customer status..."
        })
    }
}