// const Applicant = require('../modals/applicant');
import { Applicant } from "../modals/applicant.js";

const createProfile = async (req, res) => {

    console.log("body = ",req.body)
    try {
        const {email} = req.body;
        let profile = await Applicant.findOne({ email });
        if (profile) {
            return res.status(400).json({ message: 'Profile already exists' });
        } else {
            profile = await Applicant.create(req.body);
           
            return res.json({message:"profile craeted successfully",profile, success:true})
        }
    } catch (error) {
        res.status(500).json({ message: `Error to create profile: ${error.message}` });
    }
}

const viewProfile = async (req, res) => {
    try {
        const email = req.headers['email']; // Email is retrieved from the request headers
        if (!email) {
            return res.status(400).json({ message: 'Email header is required' });
        }

        // Try to find the profile
        let profile = await Applicant.findOne({ email });
        if (!profile) {
            res.status(404).json({ message: 'Profile is not Avilable'});
        }

        res.json({ message: 'Profile retrieved successfully', profile });
    } catch (error) {
        res.status(500).json({ message: `Error retrieving profile: ${error.message}` });
    }
};
export const profileController = {
    createProfile,
    viewProfile
};