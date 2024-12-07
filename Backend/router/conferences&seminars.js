import express from "express";
const router=express.Router();
import {conferences_seminarsController} from '../controller/conferences&seminarsController.js';
// const conferences_seminarsController = require('../controller/conferences&seminarsController.js');
import isAuthenticated from '../middlewares/isAuthenticated.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), conferences_seminarsController.viewConferences_seminars);
router.post('/update',isAuthenticated,roleMiddleware([1,3]), conferences_seminarsController.uploadConferences_seminars);

export default router;