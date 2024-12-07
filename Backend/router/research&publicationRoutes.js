import express from "express";
const router=express.Router();
import {research_publicationController} from '../controller/research&publicationController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const research_publicationController = require('../controller/research&publicationController');
import isAuthenticated from '../middlewares/isAuthenticated.js';
router.get('/view',isAuthenticated,roleMiddleware([1,3]), research_publicationController.viewResearch_publication);
router.post('/update',isAuthenticated,roleMiddleware([1,3]), research_publicationController.uploadResearch_publication);

export default router;