import express from "express";
const router=express.Router();
import {activityController} from '../controller/activityControlller.js';
// const activityController = require('../controller/activityControlller.js');
import roleMiddleware from '../middlewares/roleMiddleware.js';
router.get('/view',roleMiddleware([1,3]), activityController.viewActivity);
router.post('/upload',roleMiddleware([1,3]), activityController.uploadActivity);

export default router;