import express from "express";
const router=express.Router();
import {certificateController} from '../controller/certificateController.js';
// const certificateController = require('../controller/certificateController.js');
import roleMiddleware from '../middlewares/roleMiddleware.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), certificateController.viewCertificates);
router.post('/upload',isAuthenticated,roleMiddleware([1,3]), certificateController.uploadCertificates);

export default router;