// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View activity
 */
const viewActivity = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.activity || applicant.activity.length === 0) {
            return res.status(404).json({ message: 'No activity found' });
        }

        return res.status(200).json({ activity: applicant.activity });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching activity: ${error.message}` });
    }
};

/**
 * Upload activity
 */
const uploadActivity = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { activity:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Activity uploaded successfully', activity: applicant.activity });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading activity: ${error.message}` });
    }
};
export const activityController = {
    viewActivity,
    uploadActivity
};