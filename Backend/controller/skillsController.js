// const Applicant = require('../modals/applicant');
import {Applicant} from '../modals/applicant.js';
// Helper to validate skill type
const validateSkillType = (type) => {
    const validTypes = ['hardSkills', 'softSkills'];
    if (!validTypes.includes(type)) {
        throw new Error('Invalid skill type. Must be "hardSkills" or "softSkills".');
    }
};

// View Skills
const viewSkills = async (req, res) => {
    try {
        const email = req.email;
        const applicant = await Applicant.findOne({ email });
        if (!applicant) return res.status(404).json({ error: 'Applicant not found' });

        res.json(applicant.skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Skill
// const addSkill = async (req, res) => {
//     try {
//         const email = req.email;
//         const { type, name, yearsOfExperience } = req.body;

//         validateSkillType(type);

//         const skill = { name, yearsOfExperience };
//         const applicant = await Applicant.findOneAndUpdate(
//             { email },
//             { $push: { [`skills.${type}`]: skill } }, // Dynamically target hardSkills or softSkills
//             { new: true }
//         );

//         if (!applicant) return res.status(404).json({ error: 'Applicant not found' });

//         res.json({ message: 'Skill added successfully', skills: applicant.skills });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// Add Skills
const addSkill = async (req, res) => {
  try {
    const email = req.email;
    const { hardSkills, softSkills } = req.body;

    const update = {};
    if (hardSkills?.length) {
      update["skills.hardSkills"] = { $each: hardSkills };
    }
    if (softSkills?.length) {
      update["skills.softSkills"] = { $each: softSkills };
    }

    const applicant = await Applicant.findOneAndUpdate(
      { email },
      { $push: update }, // Dynamically add both hardSkills and softSkills
      { new: true }
    );

    if (!applicant)
      return res.status(404).json({ error: "Applicant not found" });

    res.json({
      message: "Skills added successfully",
      skills: applicant.skills,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update Skill
const updateSkill = async (req, res) => {
    try {
        const email = req.email;
        const { type, skillId, name, yearsOfExperience } = req.body;

        validateSkillType(type);

        const applicant = await Applicant.findOneAndUpdate(
            { email, [`skills.${type}._id`]: skillId }, // Dynamically target hardSkills or softSkills
            { $set: { [`skills.${type}.$.name`]: name, [`skills.${type}.$.yearsOfExperience`]: yearsOfExperience } },
            { new: true }
        );

        if (!applicant) return res.status(404).json({ error: 'Applicant or skill not found' });

        res.json({ message: 'Skill updated successfully', skills: applicant.skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Skill
const deleteSkill = async (req, res) => {
    try {
        const email = req.email;
        const { type, skillId } = req.body;

        validateSkillType(type);

        const applicant = await Applicant.findOneAndUpdate(
            { email },
            { $pull: { [`skills.${type}`]: { _id: skillId } } }, // Dynamically target hardSkills or softSkills
            { new: true }
        );

        if (!applicant) return res.status(404).json({ error: 'Applicant or skill not found' });

        res.json({ message: 'Skill deleted successfully', skills: applicant.skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const skillsController = {
  validateSkillType,
  viewSkills,
  addSkill,
  updateSkill,
  deleteSkill
};