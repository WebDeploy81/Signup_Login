// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View patent
 */
const viewPatent = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.patent || applicant.patent.length === 0) {
            return res.status(404).json({ message: 'No patent found' });
        }

        return res.status(200).json({ patent: applicant.patent });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching patent: ${error.message}` });
    }
};

/**
 * Upload patent
 */
const uploadPatent = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { patent:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Patent uploaded successfully', patent: applicant.patent });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading patent: ${error.message}` });
    }
};
export const patentController = {
    uploadPatent,
    viewPatent
};
