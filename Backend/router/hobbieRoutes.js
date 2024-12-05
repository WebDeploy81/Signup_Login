import express from "express";
const router=express.Router();
import {hobbieController} from '../controller/hobbieController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const hobbieController = require('../controller/hobbieController');

router.get('/view',roleMiddleware([1,3]), hobbieController.viewHobbie);
router.post('/update',roleMiddleware([1,3]), hobbieController.uploadHobbie);

export default router;