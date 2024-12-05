import express from "express";
const router=express.Router();
import {achievementController} from '../controller/achievementController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
router.get('/view',roleMiddleware([1,3]), achievementController.viewAchievement);
router.post('/update',roleMiddleware([1,3]), achievementController.uploadAchievement);
export default router;