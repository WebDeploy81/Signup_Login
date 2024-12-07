import express from "express";
const router=express.Router();
import {domain_intrestController} from '../controller/domain_intrestController.js';
// const domain_intrestController = require('../controller/domain_intrestController.js');
import isAuthenticated from '../middlewares/isAuthenticated.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
router.get('/view',isAuthenticated ,roleMiddleware([1,3]), domain_intrestController.viewDomain_intrest);
router.post('/update',isAuthenticated,roleMiddleware([1,3]), domain_intrestController.uploadDomain_intrest);

export default router;