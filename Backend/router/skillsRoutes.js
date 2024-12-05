import express from "express";
const router=express.Router();
import {skillsController} from '../controller/skillsController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const skillsController = require('../controller/skillsController');

// Add, Update, or Delete Skills
router.get('/view', roleMiddleware([1,3]), skillsController.viewSkills);
router.post('/add', roleMiddleware([1,3]), skillsController.addSkill);
router.put('/update', roleMiddleware([1,3]), skillsController.updateSkill);
router.delete('/delete', roleMiddleware([1,3]), skillsController.deleteSkill);

export default router;
