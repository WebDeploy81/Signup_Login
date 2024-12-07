// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View research_publication
 */
const viewResearch_publication = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.research_publication || applicant.research_publication.length === 0) {
            return res.status(404).json({ message: 'No research_publication found' });
        }

        return res.status(200).json({ research_publication: applicant.research_publication });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching research_publication: ${error.message}` });
    }
};

/**
 * Upload research_publication
 */
const uploadResearch_publication = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $push: { research_publication:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Research_publication uploaded successfully', research_publication: applicant.research_publication });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading research_publication: ${error.message}` });
    }
};
export const research_publicationController = {
    viewResearch_publication,
    uploadResearch_publication
};