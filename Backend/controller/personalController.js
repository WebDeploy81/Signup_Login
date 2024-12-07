// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
// View Personal Information
const viewPersonal = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        let applicant = await Applicant.findOne({ email });

        if (!applicant) {
            // Create a new profile if none exists
            applicant = new Applicant({ email });
            await applicant.save();
        }

        res.json({
            fullName: applicant.fullName,
            phone: applicant.phone,
            location: applicant.location,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Personal Information
const updatePersonal = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        const updateData = req.body;

        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ error: 'Applicant not found' });
        }

        res.json({ message: 'Personal information updated successfully', personalInfo: applicant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const personalController = {
    viewPersonal,
    updatePersonal
};
