import express from "express";
import jwt from "jsonwebtoken";

export const isDriverAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const driverAuthToken = req.cookies.driverAuthToken || req.body.driverAuthToken;
    const driverRefreshToken = req.cookies.driverRefreshToken || req.body.driverRefreshToken;
    if (!driverAuthToken && !driverRefreshToken) {
        return res.status(401).json({
            message: "Authentication failed: No authToken or refreshToken provided..."
        });
    }
    jwt.verify(driverAuthToken, process.env.JWT_SECRET_KEY || "", (err: any, decoded: any) => {
        if (err) {
            // Auth token has expired, check the refresh token
            jwt.verify(driverRefreshToken, process.env.JWT_REFRESH_SECRET_KEY || "", (refreshErr: any, refreshDecoded: any) => {
                // Both tokens are invalid, send an error message and prompt for login
                if (refreshErr) {
                    // Both tokens are invalid, send an error message and prompt for login
                    return res.status(401).json({
                        message: "Authentication failed: Both tokens are invalid...",
                        ok: false,
                    });
                } else {
                    // Generate new auth and refresh tokens
                    const newDriverAuthToken = jwt.sign(
                        { driverId: refreshDecoded.driverId },
                        process.env.JWT_SECRET_KEY || "",
                        { expiresIn: "40m" }
                    );
                    const newDriverRefreshToken = jwt.sign(
                        { driverId: refreshDecoded.driverId },
                        process.env.JWT_REFRESH_SECRET_KEY || "",
                        { expiresIn: "1d" }
                    );
                    // Set the new tokens as cookies in the response
                    res.cookie("driverAuthToken", newDriverAuthToken, { httpOnly: true });
                    res.cookie("driverRefreshToken", newDriverRefreshToken, { httpOnly: true });
                    // Continue processing the request with the new auth token
                    Object.assign(req, { driverId: refreshDecoded?.driverId });
                    Object.assign(req, { ok: true });
                    next();
                }
            }
            );
        } else {
            Object.assign(req, { driverId: decoded?.driverId });
            next();
        }
    }
    );
}