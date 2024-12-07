import express from "express";
const router=express.Router();
import {achievementController} from '../controller/achievementController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), achievementController.viewAchievement);
router.post('/update',isAuthenticated, roleMiddleware([1,3]), achievementController.uploadAchievement);
export default router;