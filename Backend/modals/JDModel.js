// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const JDDataSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    noOfVacancies: { type: String },
    collegeCategory: { type: String },
    aboutCompany: { type: String },
    companyName: { type: String },
    jobLocation: { type: String },
    availability: { type: String },
    salaryRange: { type: String },
    salaryType: { type: String },
    essentialQualification: { type: String },
    hardSkills: { type: [String] },
    softSkills: { type: [String] },
    domain: { type: String },
    workMode: { type: String },
    modeOfEmployment: { type: String },
    rolesAndResponsibilities: { type: [String] },
    perksAndBenefits: { type: [String] },
    levelOfRole: { type: String },
    preferredQualification: { type: String },
    salaryCurrency: { type: String },
    overallExperience: { type: String },
    relevantExperience: { type: String },
    jobDescriptionSummary: { type: String },
    experienceSkills: { type: [String] },
    preferredSkills: { type: [String] },
    applicantsSegments: {
        skills: { type: [String] },
        workExperience: { type: String },
        personalDetails: { type: String },
        education: { type: String },
        internships: { type: String },
        certifications: { type: String },
        extraCurricular: { type: String },
        achievements: { type: String },
        projects: { type: String },
        researchPublications: { type: String },
        conferenceSeminar: { type: String },
        areasOfInterest: { type: String },
        languages: { type: String },
        patents: { type: String },
        profileSummary: { type: String },
        hobbies: { type: String },
        references: { type: String },
        thesis: { type: String },
        willingToRelocate: { type: Boolean },
    },
}, { timestamps: true });

// module.exports = mongoose.model('JDData', JDDataSchema);

export const JDData = mongoose.model('JDData', JDDataSchema);
