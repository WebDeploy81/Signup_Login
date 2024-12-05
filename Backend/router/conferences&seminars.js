import express from "express";
const router=express.Router();
import {conferences_seminarsController} from '../controller/conferences&seminarsController.js';
// const conferences_seminarsController = require('../controller/conferences&seminarsController.js');
import roleMiddleware from '../middlewares/roleMiddleware.js';
router.get('/view',roleMiddleware([1,3]), conferences_seminarsController.viewConferences_seminars);
router.post('/update',roleMiddleware([1,3]), conferences_seminarsController.uploadConferences_seminars);

export default router;