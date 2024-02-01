import express from "express";
import { isCustomerAuthenticated } from "../middlewares/isCustomerAuthenticated";
import { updateCustomerLocation, getNearbyCabs, requestRide } from "../controllers/customer.controller";

const router = express.Router();

router.post("/updateCustomerLocation", isCustomerAuthenticated, updateCustomerLocation);
router.post("/getNearbyCabs", getNearbyCabs);
router.post("/requestRide", isCustomerAuthenticated, requestRide);

export default router;