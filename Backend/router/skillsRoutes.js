import express from "express";
const router=express.Router();
import {skillsController} from '../controller/skillsController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const skillsController = require('../controller/skillsController');
import isAuthenticated from '../middlewares/isAuthenticated.js';
// Add, Update, or Delete Skills
router.get('/view',isAuthenticated, roleMiddleware([1,3]), skillsController.viewSkills);
router.post('/add',isAuthenticated, roleMiddleware([1,3]), skillsController.addSkill);
router.put('/update',isAuthenticated, roleMiddleware([1,3]), skillsController.updateSkill);
router.delete('/delete',isAuthenticated, roleMiddleware([1,3]), skillsController.deleteSkill);

export default router;
