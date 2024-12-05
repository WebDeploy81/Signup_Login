import express from "express";
const router=express.Router();
import {referenceController} from '../controller/referenceController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const referenceController = require('../controller/referenceController');

router.get('/view',roleMiddleware([1,3]), referenceController.viewReference);
router.post('/update',roleMiddleware([1,3]), referenceController.uploadReference);

export default router;