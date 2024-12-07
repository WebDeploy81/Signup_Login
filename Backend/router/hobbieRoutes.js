import express from "express";
const router=express.Router();
import {hobbieController} from '../controller/hobbieController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const hobbieController = require('../controller/hobbieController');
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.get('/view',isAuthenticated,roleMiddleware([1,3]), hobbieController.viewHobbie);
router.post('/update',isAuthenticated,roleMiddleware([1,3]), hobbieController.uploadHobbie);

export default router;