// const mongoose = require('../service/db');
import mongoose from "mongoose";
const { Schema } = mongoose;

const ApplicantSchema = new Schema({
    // email: { type: String, required: true, unique: true },
    // fullName: { type: String, default: '' },
    // phone: { type: String, default: '' },
    // location: { type: String, default: '' },
    // profilePicture: { type: String, default: '' },
    education: [
        {
            institution: String,
            degree: String,
            specialization: String,
            yearOfGraduation: Number, 
            cgpa: Number,
            percentage: Number,
        },
    ],
    experience: [
        {
            jobTitle: String,
            companyName: String,
            startDate: Date,
            endDate: Date,
            keyResponsibilities: String,
            skills: [String],
        },
    ],
    skills: {
        hardSkills: [
            {
                name: String,
                yearsOfExperience: Number,
            },
        ],
        softSkills: [
            {
                name: String,
                yearsOfExperience: Number,
            },
        ],
    },
}, { strict: false }); // Added strict: false here

export const Applicant = mongoose.model('Applicant', ApplicantSchema);