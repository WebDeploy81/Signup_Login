// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View onferences_seminars
 */
const viewConferences_seminars = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.conferences_seminars || applicant.conferences_seminars.length === 0) {
            return res.status(404).json({ message: 'No conferences_seminars found' });
        }

        return res.status(200).json({ conferences_seminars: applicant.conferences_seminars });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching conferences_seminars: ${error.message}` });
    }
};

/**
 * Upload conferences_seminars
 */
const uploadConferences_seminars = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { conferences_seminars:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Conferences_seminars uploaded successfully', conferences_seminars: applicant.conferences_seminars });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading conferences_seminars: ${error.message}` });
    }
};
export const conferences_seminarsController = {
    viewConferences_seminars,
    uploadConferences_seminars
};