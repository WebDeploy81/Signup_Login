import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { getAllusers } from "../controller/admin.js";
const router=express.Router();

router.route("/users").get(isAuthenticated,roleMiddleware([1]),getAllusers);
export default router;