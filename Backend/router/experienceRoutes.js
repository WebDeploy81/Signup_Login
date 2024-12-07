import express from "express";
const router=express.Router();
import {experienceController} from '../controller/experienceController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
// const experienceController = require('../controller/experienceController');
// Add, Update, or Delete Experience
router.get('/view',isAuthenticated,roleMiddleware([1,3]), experienceController.viewExperience);
router.post('/add',isAuthenticated, roleMiddleware([1,3]), experienceController.addExperience);
router.put('/update',isAuthenticated, roleMiddleware([1,3]), experienceController.updateExperience);
router.delete('/delete',isAuthenticated, roleMiddleware([1,3]), experienceController.deleteExperience);


export default router;