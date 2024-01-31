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
            message: "Customer's location updated successfully..."
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to update customer's location..."
        })
    }
}

export const getNearbyCabs = async (req: express.Request, res: express.Response) => {
    try {
        const {location} = req.body;
        const drivers = await Driver.find({ location: location })
        return res.status(200).json({
            drivers
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to fetch nearby cabs..."
        })
    }
}