import express from "express";
import jwt from "jsonwebtoken";

export const isCustomerAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const customerAuthToken = req.cookies.customerAuthToken || req.body.customerAuthToken;
    const customerRefreshToken = req.cookies.customerRefreshToken || req.body.customerRefreshToken;
    if (!customerAuthToken && !customerRefreshToken) {
        return res.status(401).json({
            message: "Authentication failed: No authToken or refreshToken provided..."
        });
    }
    jwt.verify(customerAuthToken, process.env.JWT_SECRET_KEY || "", (err: any, decoded: any) => {
        if (err) {
            jwt.verify(customerRefreshToken, process.env.JWT_REFRESH_SECRET_KEY || "", (refreshErr: any, refreshDecoded: any) => {
                if (refreshErr) {
                    return res.status(401).json({
                        message: "Authentication failed: Both tokens are invalid...",
                        ok: false,
                    });
                } else {
                    const newCustomerAuthToken = jwt.sign(
                        { customerId: refreshDecoded.customerId },
                        process.env.JWT_SECRET_KEY || "",
                        { expiresIn: "40m" }
                    );
                    const newCustomerRefreshToken = jwt.sign(
                        { customerId: refreshDecoded.customerId },
                        process.env.JWT_REFRESH_SECRET_KEY || "",
                        { expiresIn: "1d" }
                    );
                    res.cookie("customerAuthToken", newCustomerAuthToken, { httpOnly: true });
                    res.cookie("customerRefreshToken", newCustomerRefreshToken, { httpOnly: true });
                    Object.assign(req, { customerId: refreshDecoded?.customerId });
                    Object.assign(req, { ok: true });
                    next();
                }
            }
            );
        } else {
            Object.assign(req, { customerId: decoded?.customerId });
            next();
        }
    }
    );
}