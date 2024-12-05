// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View reference
 */
const viewReference = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.reference || applicant.reference.length === 0) {
            return res.status(404).json({ message: 'No reference found' });
        }

        return res.status(200).json({ reference: applicant.reference });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching reference: ${error.message}` });
    }
};

/**
 * Upload reference
 */
const uploadReference = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { reference:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Reference uploaded successfully', reference: applicant.reference });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading reference: ${error.message}` });
    }
};
export const referenceController = {
    uploadReference,
    viewReference
};
