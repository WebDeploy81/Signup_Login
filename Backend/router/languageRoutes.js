import express from "express";
const router=express.Router();
import {languageController} from '../controller/languageController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const languageController = require('../controller/languageController');

router.get('/view',roleMiddleware([1,3]), languageController.viewLanguage);
router.post('/update',roleMiddleware([1,3]), languageController.uploadLanguage);

export default router;