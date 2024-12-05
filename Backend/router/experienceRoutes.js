import express from "express";
const router=express.Router();
import {experienceController} from '../controller/experienceController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
// const experienceController = require('../controller/experienceController');
// Add, Update, or Delete Experience
router.get('/view',roleMiddleware([1,3]), experienceController.viewExperience);
router.post('/add', roleMiddleware([1,3]), experienceController.addExperience);
router.put('/update', roleMiddleware([1,3]), experienceController.updateExperience);
router.delete('/delete', roleMiddleware([1,3]), experienceController.deleteExperience);


export default router;