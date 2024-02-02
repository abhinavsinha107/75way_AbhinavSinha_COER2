import express from "express";
import { isCustomerAuthenticated } from "../middlewares/isCustomerAuthenticated";
import { updateCustomerLocation, getNearbyCabs, requestRide, updateCustomerStatus, getCustomerStatus } from "../controllers/customer.controller";

const router = express.Router();

router.post("/updateCustomerLocation", isCustomerAuthenticated, updateCustomerLocation);
router.post("/getNearbyCabs", getNearbyCabs);
router.post("/requestRide", isCustomerAuthenticated, requestRide);
router.post("/updateCustomerStatus", isCustomerAuthenticated, updateCustomerStatus);
router.post("/getCustomerStatus", isCustomerAuthenticated, getCustomerStatus);

export default router;