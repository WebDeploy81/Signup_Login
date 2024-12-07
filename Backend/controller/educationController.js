// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View all education details for a user.
 */
const viewEducation = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const applicant = await Applicant.findOne({ email }, 'education');
        if (!applicant) {
            return res.status(404).json({ message: 'No profile found for this email' });
        }

        res.json({ message: 'Education details retrieved successfully', education: applicant.education });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving education details: ${error.message}` });
    }
};

/**
 * Add a new education entry (multiple entries).
 */
const addEducation = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        console.log(email);
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const { educationDetails } = req.body;
        if (!Array.isArray(educationDetails) || educationDetails.length === 0) {
            return res.status(400).json({ message: 'educationDetails must be a non-empty array' });
        }

        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { education: { $each: educationDetails } } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No profile found for this email' });
        }

        res.json({ message: 'Education details added successfully', education: applicant.education });
    } catch (error) {
        res.status(500).json({ message: `Error adding education details: ${error.message}` });
    }
};

/**
 * Edit a single education entry.
 */
const editEducation = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const { id, ...updatedFields } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Education ID is required for editing' });
        }

        const updateQuery = {};
        for (let key in updatedFields) {
            if (updatedFields.hasOwnProperty(key)) {
                updateQuery[`education.$.${key}`] = updatedFields[key];
            }
        }

        const applicant = await Applicant.findOneAndUpdate(
            { email, 'education._id': id },
            { $set: updateQuery },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No education entry found with the provided ID' });
        }

        res.json({ message: 'Education entry updated successfully', education: applicant.education });
    } catch (error) {
        res.status(500).json({ message: `Error updating education entry: ${error.message}` });
    }
};

/**
 * Update multiple education entries in bulk.
 */
const updateEducationBulk = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const { educationUpdates } = req.body; // [{ id, updatedFields }]
        if (!Array.isArray(educationUpdates) || educationUpdates.length === 0) {
            return res.status(400).json({ message: 'educationUpdates must be a non-empty array' });
        }

        const bulkOps = educationUpdates.map((update) => {
            const { id, ...updatedFields } = update;
            const updateQuery = {};
            for (let key in updatedFields) {
                updateQuery[`education.$.${key}`] = updatedFields[key];
            }
            return {
                updateOne: {
                    filter: { email, 'education._id': id },
                    update: { $set: updateQuery }
                }
            };
        });

        const result = await Applicant.bulkWrite(bulkOps);

        res.json({ message: 'Education entries updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: `Error updating education entries in bulk: ${error.message}` });
    }
};

/**
 * Delete multiple education entries in bulk.
 */
const deleteEducationBulk = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        const { ids } = req.body; // Array of education IDs
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'ids must be a non-empty array' });
        }

        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $pull: { education: { _id: { $in: ids } } } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No profile found for this email' });
        }

        res.json({ message: 'Education entries deleted successfully', education: applicant.education });
    } catch (error) {
        res.status(500).json({ message: `Error deleting education entries: ${error.message}` });
    }
};
export const educationController = {
    viewEducation,
    addEducation,
    updateEducationBulk,
    deleteEducationBulk,
    editEducation
};