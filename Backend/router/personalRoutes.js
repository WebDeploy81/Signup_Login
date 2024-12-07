import express from "express";
const router=express.Router();
import {personalController} from '../controller/personalController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const personalController = require('../controller/personalController');
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), personalController.viewPersonal);
router.put('/update',isAuthenticated,roleMiddleware([1,3]), personalController.updatePersonal);

export default router;