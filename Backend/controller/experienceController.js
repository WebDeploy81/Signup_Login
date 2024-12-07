// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View all experiences for a user.
 */
const viewExperience = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const applicant = await Applicant.findOne({ email }, 'experience');
        if (!applicant) {
            return res.status(404).json({ message: 'No profile found for this email' });
        }

        res.json({ message: 'Experiences retrieved successfully', experience: applicant.experience });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving experiences: ${error.message}` });
    }
};

/**
 * Add a new experience.
 */
const addExperience = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const newExperience = req.body;
        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { experience: newExperience } },
            { new: true }
        );

        res.json({ message: 'Experience added successfully', experience: applicant.experience });
    } catch (error) {
        res.status(500).json({ message: `Error adding experience: ${error.message}` });
    }
};

/**
 * Update an existing experience.
 */
const updateExperience = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const { id, ...updatedExperience } = req.body;

        // Ensure that we only update specific fields without removing others
        const updateQuery = {};
        for (let key in updatedExperience) {
            if (updatedExperience.hasOwnProperty(key)) {
                updateQuery[`experience.$.${key}`] = updatedExperience[key];
            }
        }

        const applicant = await Applicant.findOneAndUpdate(
            { email, 'experience._id': id },
            { $set: updateQuery },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'Experience entry not found' });
        }

        res.json({ message: 'Experience updated successfully', experience: applicant.experience });
    } catch (error) {
        res.status(500).json({ message: `Error updating experience: ${error.message}` });
    }
};

/**
 * Delete an experience.
 */
const deleteExperience = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const { id } = req.body;

        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $pull: { experience: { _id: id } } },
            { new: true }
        );

        res.json({ message: 'Experience deleted successfully', experience: applicant.experience });
    } catch (error) {
        res.status(500).json({ message: `Error deleting experience: ${error.message}` });
    }
};
export const experienceController = {
    deleteExperience,
    addExperience,
    updateExperience,
    viewExperience
};
