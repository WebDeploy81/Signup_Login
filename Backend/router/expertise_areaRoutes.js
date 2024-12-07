import express from "express";
const router=express.Router();
import {experties_areaController} from '../controller/experties_areaController.js';
// const experties_areaController = require('../controller/experties_areaController.js');
import roleMiddleware from '../middlewares/roleMiddleware.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), experties_areaController.viewExperties_area);
router.post('/update',isAuthenticated,roleMiddleware([1,3]), experties_areaController.uploadExperties_area);

export default router;