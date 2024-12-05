// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View language
 */
const viewLanguage = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.language || applicant.language.length === 0) {
            return res.status(404).json({ message: 'No language found' });
        }

        return res.status(200).json({ language: applicant.language });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching language: ${error.message}` });
    }
};

/**
 * Upload language
 */
const uploadLanguage = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { language:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Language uploaded successfully', language: applicant.language });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading language: ${error.message}` });
    }
};
export const languageController = {
    uploadLanguage,
    viewLanguage
};