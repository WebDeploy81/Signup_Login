import express from "express";
const router=express.Router();
import {languageController} from '../controller/languageController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const languageController = require('../controller/languageController');
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), languageController.viewLanguage);
router.post('/update',isAuthenticated,roleMiddleware([1,3]), languageController.uploadLanguage);

export default router;