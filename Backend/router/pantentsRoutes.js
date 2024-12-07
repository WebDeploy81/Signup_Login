import express from "express";
const router=express.Router();
import {patentController} from '../controller/patentController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const patentController = require('../controller/patentController');
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), patentController.viewPatent);
router.post('/update',isAuthenticated,roleMiddleware([1,3]), patentController.uploadPatent);

export default router;