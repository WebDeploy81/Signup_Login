import express from "express";
const router=express.Router();
import {projectController} from '../controller/projectController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const projectController = require('../controller/projectController');

router.get('/view',roleMiddleware([1,3]), projectController.viewProject);
router.post('/update',roleMiddleware([1,3]), projectController.uploadProject);

export default router;