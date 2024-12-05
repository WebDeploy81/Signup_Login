// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View project
 */
const viewProject = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.project || applicant.project.length === 0) {
            return res.status(404).json({ message: 'No project found' });
        }

        return res.status(200).json({ project: applicant.project });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching project: ${error.message}` });
    }
};

/**
 * Upload project
 */
const uploadProject = async (req, res) => {
    try {
        const email = req.email;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { project:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Project uploaded successfully', project: applicant.project });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading project: ${error.message}` });
    }
};
export const projectController = {
    viewProject,
    uploadProject
};