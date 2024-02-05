import express from "express";
import { isCustomerAuthenticated } from "../middlewares/isCustomerAuthenticated";
import { updateCustomerLocation, getNearbyCabs, requestRide, updateCustomerStatus, getCustomerStatus, getRideHistory } from "../controllers/customer.controller";

const router = express.Router();

router.post("/updateCustomerLocation", isCustomerAuthenticated, updateCustomerLocation);
router.post("/getNearbyCabs", getNearbyCabs);
router.post("/requestRide", isCustomerAuthenticated, requestRide);
router.post("/updateCustomerStatus", isCustomerAuthenticated, updateCustomerStatus);
router.post("/getCustomerStatus", isCustomerAuthenticated, getCustomerStatus);
router.post("/getRideHistory", isCustomerAuthenticated, getRideHistory);

export default router;