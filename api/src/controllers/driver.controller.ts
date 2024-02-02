import express from "express";
import Driver from "../models/driver.model"
import Customer from "../models/customer.model"

export const updateDriverLocation = async (req: express.Request, res: express.Response) => {
    try {
        await Driver.findByIdAndUpdate(req.driverId, {
            $set: {
                location: req.body.location
            }
        })
        return res.status(201).json({
            message: "Driver's location updated successfully..."
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to update driver's location..."
        })
    }
}

export const getAllRequests = async (req: express.Request, res: express.Response) => {
    try {
        const driver = await Driver.findById({ _id: req.driverId });
        if (!driver) {
            return res.status(404).json({
                message: "Driver not found...",
            });
        }
        const requests = driver.requests;
        return res.status(200).json(requests)
    } catch (err) {
        return res.status(500).json({
            message: "Unable to fetch cab requests..."
        })
    }
}

export const approveRequest = async (req: express.Request, res: express.Response) => {
    try {
        const { customerId, location } = req.body;
        const driver = await Driver.findById({ _id: req.driverId });
        if (!driver) {
            return res.status(404).json({
                message: "Driver not found...",
            });
        }
        const request = {
            customerId, location
        }
        driver.approved.push(request);
        let requestIndex = -1;
        for (let i = 0; i < driver.requests.length; i++) {
            if (request.customerId === driver.requests[i].customerId && request.location === driver.requests[i].location) {
                requestIndex = i;
                break;
            }
        }
        if (requestIndex !== -1) {
            driver.requests.splice(requestIndex, 1);
            await driver.save();
        }
        const customer = await Customer.findById({ _id: customerId });
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found...",
            });
        }
        customer.currentStatus = "Approved";
        await customer.save();
        return res.status(200).json({
            message: "Request approved successfully..."
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to approve request..."
        })
    }
}

export const cancelRequest = async (req: express.Request, res: express.Response) => {
    try {
        const { customerId, location } = req.body;
        const driver = await Driver.findById({ _id: req.driverId });
        if (!driver) {
            return res.status(404).json({
                message: "Driver not found...",
            });
        }
        const request = {
            customerId, location
        }
        let requestIndex = -1;
        for (let i = 0; i < driver.requests.length; i++) {
            if (request.customerId === driver.requests[i].customerId && request.location === driver.requests[i].location) {
                requestIndex = i;
                break;
            }
        }
        if (requestIndex !== -1) {
            driver.requests.splice(requestIndex, 1);
            await driver.save();
        }
        const customer = await Customer.findById({ _id: customerId });
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found...",
            });
        }
        customer.currentStatus = "Rejected";
        await customer.save();
        return res.status(200).json({
            message: "Request approved successfully..."
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to approve request..."
        })
    }
}

export const startRide = async (req: express.Request, res: express.Response) => {
    try {
        const { customerId, location } = req.body;
        const customer = await Customer.findById({ _id: customerId });
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found...",
            });
        }
        customer.currentStatus = "Started";
        await customer.save();
        return res.status(200).json({
            message: "Ride started successfully..."
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to approve request..."
        })
    }
}