import express from "express";
import { isDriverAuthenticated } from "../middlewares/isDriverAuthenticated";
import { updateDriverLocation, getAllRequests, approveRequest, cancelRequest, startRide, finishRide } from "../controllers/driver.controller";

const router = express.Router();

router.post("/updateDriverLocation", isDriverAuthenticated, updateDriverLocation);
router.post("/getCabRequests", isDriverAuthenticated, getAllRequests);
router.post("/approveRequest", isDriverAuthenticated, approveRequest);
router.post("/cancelRequest", isDriverAuthenticated, cancelRequest);
router.post("/startRide", isDriverAuthenticated, startRide);
router.post("/finishRide", isDriverAuthenticated, finishRide);

export default router;