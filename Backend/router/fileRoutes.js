import express from "express";
const router=express.Router();
import {fileUpload} from '../controller/fileController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";
// const fileUpload = require('../controller/fileController');
import { uploadProfilePic, uploadCv, multerErrorHandler } from '../middlewares/fileUpload.js';
// View CV
router.get('/view-cv',roleMiddleware([1,3]), fileUpload.viewCv);

// View Profile Picture
router.get('/view-profile-pic',roleMiddleware([1,3]), fileUpload.viewProfilePic);

// Upload CV
router.post('/upload-cv', (req, res, next) => {
    uploadCv(req, res, (err) => {
        if (err) {
            next(err); 
        } else {
            fileUpload.uploadCv(req, res, next);
        }
    });
});

// Upload Profile Picture
router.post('/upload-profile-pic', (req, res, next) => {
    uploadProfilePic(req, res, (err) => {
        if (err) {
            next(err);
        } else {
            fileUpload.uploadProfilePic(req, res, next);
        }
    });
});

// Multer Error Handler
router.use(multerErrorHandler);

export default router;