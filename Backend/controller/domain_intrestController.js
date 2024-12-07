// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
/**
 * View Domain_intrest
 */
const viewDomain_intrest = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;
        const applicant = await Applicant.findOne({ email });

        if (!applicant || !applicant.domain_intrest || applicant.domain_intrest.length === 0) {
            return res.status(404).json({ message: 'No domain_intrest found' });
        }

        return res.status(200).json({ domain_intrest: applicant.domain_intrest });
    } catch (error) {
        return res.status(500).json({ message: `Error fetching domain_intrest: ${error.message}` });
    }
};

/**
 * Upload domain_intrest
 */
const uploadDomain_intrest = async (req, res) => {
    try {
        const email = req.headers.email || req.headers.mobile;


        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $set: { domain_intrest:  req.body  } },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: 'No applicant found' });
        }

        return res.status(200).json({ message: 'Domain_intrest uploaded successfully', domain_intrest: applicant.domain_intrest });
    } catch (error) {
        return res.status(500).json({ message: `Error uploading domain_intrest: ${error.message}` });
    }
};
export const domain_intrestController = {
    viewDomain_intrest,
    uploadDomain_intrest
};