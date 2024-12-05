import express from "express";
const router=express.Router();
import {patentController} from '../controller/patentController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const patentController = require('../controller/patentController');

router.get('/view',roleMiddleware([1,3]), patentController.viewPatent);
router.post('/update',roleMiddleware([1,3]), patentController.uploadPatent);

export default router;