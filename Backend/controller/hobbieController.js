// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View hobbie
 */
const viewHobbie = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.hobbie || applicant.hobbie.length === 0) {
            return res.status(404).json({ message: 'No hobbie found' });
        }

        return res.status(200).json({ hobbie: applicant.hobbie });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching hobbie: ${error.message}` });
    }
};

/**
 * Upload hobbie
 */
const uploadHobbie = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $set: { hobbie:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Hobbie uploaded successfully', hobbie: applicant.hobbie });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading hobbie: ${error.message}` });
    }
};
export const hobbieController = {
    viewHobbie,
    uploadHobbie
};