import express from "express";
import { isCustomerAuthenticated } from "../middlewares/isCustomerAuthenticated";
import { updateCustomerLocation, getNearbyCabs } from "../controllers/customerLoc.controller";

const router = express.Router();

router.post("/updateCustomerLocation", isCustomerAuthenticated, updateCustomerLocation);
router.get("/getNearbyCabs", getNearbyCabs);

export default router;