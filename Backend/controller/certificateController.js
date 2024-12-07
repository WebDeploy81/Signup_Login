// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View Certificates
 */
const viewCertificates = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.certificates || applicant.certificates.length === 0) {
            return res.status(404).json({ message: 'No certificates found' });
        }

        return res.status(200).json({ certificates: applicant.certificates });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching certificates: ${error.message}` });
    }
};

/**
 * Upload Certificates
 */
const uploadCertificates = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;

        // if (!certificates || !Array.isArray(certificates) || certificates.length === 0) {
        //     return res.status(400).json({ message: 'Certificates must be a non-empty array' });
        // }

        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { certificates:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Certificates uploaded successfully', certificates: applicant.certificates });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading certificates: ${error.message}` });
    }
};
export const certificateController = {
    viewCertificates,
    uploadCertificates
};