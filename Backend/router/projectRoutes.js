import express from "express";
const router=express.Router();
import {projectController} from '../controller/projectController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const projectController = require('../controller/projectController');
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), projectController.viewProject);
router.post('/update',isAuthenticated,roleMiddleware([1,3]), projectController.uploadProject);

export default router;