import express from "express";
import { register,verifytoken,loginUser, logout } from "../controller/user.js";
const router=express.Router();

router.route("/register").post(register);
router.route("/verify").get(verifytoken);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

export default router;