// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View Achievement
 */
const viewAchievement = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.achievement || applicant.achievement.length === 0) {
            return res.status(404).json({ message: 'No achievement found' });
        }

        return res.status(200).json({ achievement: applicant.achievement });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching achievement: ${error.message}` });
    }
};

/**
 * Upload Achievement
 */
const uploadAchievement = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { achievement:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Achievement uploaded successfully', achievement: applicant.achievement });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading achievement: ${error.message}` });
    }
};
export const achievementController = {
    viewAchievement,
    uploadAchievement
};