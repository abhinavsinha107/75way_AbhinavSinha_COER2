import express from "express";
import { isDriverAuthenticated } from "../middlewares/isDriverAuthenticated";
import { updateDriverLocation } from "../controllers/driverLoc.controller";

const router = express.Router();

router.post("/updateDriverLocation", isDriverAuthenticated, updateDriverLocation);

export default router;