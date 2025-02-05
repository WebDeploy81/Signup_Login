import express from "express";
const router=express.Router();
import {profileController} from '../controller/profileController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
// const profileController = require('../controller/profileController');
// View Profile
router.post('/create',isAuthenticated,roleMiddleware([1,3]), profileController.createProfile);
router.get('/view',isAuthenticated,roleMiddleware([1,3]), profileController.viewProfile);

export default router;
