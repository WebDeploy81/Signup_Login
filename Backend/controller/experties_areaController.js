// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View experties_area
 */
const viewExperties_area = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.experties_area || applicant.experties_area.length === 0) {
            return res.status(404).json({ message: 'No experties_area found' });
        }

        return res.status(200).json({ experties_area: applicant.experties_area });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching experties_area: ${error.message}` });
    }
};

/**
 * Upload Experties_area
 */
const uploadExperties_area = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $set: { experties_area:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Experties_area uploaded successfully', experties_area: applicant.experties_area });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading experties_area: ${error.message}` });
    }
};
export const experties_areaController = {
    viewExperties_area,
    uploadExperties_area,
};