import express from "express";
const router=express.Router();
import {educationController} from '../controller/educationController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
import isAuthenticated from '../middlewares/isAuthenticated.js';
// const educationController = require('../controller/educationController');
// View, Add, Edit, Update, or Delete Education
router.get('/view',isAuthenticated,roleMiddleware([1,3]), educationController.viewEducation);           // View education details
router.post('/add',isAuthenticated, roleMiddleware([1,3]),educationController.addEducation);           // Add new education entries
router.put('/update',isAuthenticated, roleMiddleware([1,3]), educationController.editEducation);        // Edit a single education entry
router.put('/updateBulk',isAuthenticated,roleMiddleware([1,3]),  educationController.updateEducationBulk);  // Update multiple education entries in bulk
router.delete('/deleteBulk',isAuthenticated,roleMiddleware([1,3]),  educationController.deleteEducationBulk); // Delete multiple education entries in bulk

export default router;