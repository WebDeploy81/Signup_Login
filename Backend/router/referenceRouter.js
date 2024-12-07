import express from "express";
const router=express.Router();
import {referenceController} from '../controller/referenceController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const referenceController = require('../controller/referenceController');
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), referenceController.viewReference);
router.post('/update',isAuthenticated,roleMiddleware([1,3]), referenceController.uploadReference);

export default router;