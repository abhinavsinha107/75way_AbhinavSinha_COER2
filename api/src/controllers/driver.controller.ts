import express from "express";
import Driver from "../models/driver.model"

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