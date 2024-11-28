import express from "express";
import { register,verifytoken,loginUser, logout } from "../controller/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { sendOtp, verifyOtp } from "../controller/auth.otp.js";
const router=express.Router();

router.route("/register").post(register);
router.route("/verify").get(verifytoken);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, logout);
router.route("/otpSend").post(sendOtp);
router.route("/otpVerify").post(verifyOtp);
export default router;