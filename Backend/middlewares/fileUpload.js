// const multer = require('multer');
import multer from 'multer';
// const cloudinary = require('../service/cloudinaryConfig'); // Your Cloudinary config file
import cloudinary from '../service/cloudinaryConfig.js';
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
import {CloudinaryStorage} from 'multer-storage-cloudinary';

// Profile Picture Storage Configuration
const profilePicStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile-pics', // Folder in Cloudinary
        allowedFormats: ["jpg", "png", "jpeg"],
        public_id: (req, file) => {
            const fileName = file.originalname.split('.').slice(0, -1).join('-');
            return `${Date.now()}-${fileName}` // Use timestamp to avoid name conflicts
        },
        transformation: [{ width: 300, height: 300, crop: 'fill' }], // Resize to 300x300 for images
    },
});

// CV Storage Configuration
const cvStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cvs', // Folder in Cloudinary
        resource_type: 'raw',
        public_id: (req, file) => {
            const fileName = file.originalname.split('.').slice(0, -1).join('-');
            return `${Date.now()}-${fileName}`; 
        },
    },
});

// Custom Error Handling Middleware
function multerErrorHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        // Multer-specific errors
        return res.status(400).json({ error: err.message });
    } else if (err) {
        // General errors
        return res.status(400).json({ error: err.message });
    }
    next();
}

// Profile Picture Upload Middleware
const uploadProfilePic = multer({
    storage: profilePicStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        const mimeType = file.mimetype.split('/')[0];
        if (mimeType !== 'image') {
            return cb(new Error('Only image files (JPG, PNG) are allowed!'), false);
        }
        cb(null, true);
    },
}).single('profilePic');

// CV Upload Middleware
const uploadCv = multer({
    storage: cvStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit for CVs
    fileFilter: (req, file, cb) => {
        const validMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (!validMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Only PDF, DOC, and DOCX files are allowed!'), false);
        }
        cb(null, true);
    },
}).single('cv');

// Export the upload middlewares and error handler
// module.exports = {
//     uploadProfilePic,
//     uploadCv,
//     multerErrorHandler,
// };
export { uploadProfilePic, uploadCv, multerErrorHandler };
