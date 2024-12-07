import express from "express";
const router=express.Router();
import {profile_summeryController} from '../controller/profile_summeryController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const profile_summeryController = require('../controller/profile_summeryController');
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), profile_summeryController.viewProfile_summery);
router.post('/update',isAuthenticated ,roleMiddleware([1,3]), profile_summeryController.uploadProfile_summery);

export default router;