import React, { useState } from "react";
import {API} from '../../constant/constant';
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Chip,
  Autocomplete,
  Box,
  Card
} from "@mui/material";

const SkillsForm = ({ onNext, data }) => {
  const [skills, setSkills] = useState({
    hardSkills: data.hardSkills || [],
    softSkills: data.softSkills || [],
    newHardSkill: "",
    newSoftSkill: "",
    hardSkillYears: "",
    softSkillYears: "",
  });

  const skillSuggestions = [
    "JavaScript",
    "HTML",
    "CSS",
    "React.js",
    "Node.js",
    "Java",
    "Python",
    "SQL",
    "TypeScript",
    "MongoDB",
    "Git",
    "Docker",
    "GraphQL",
    "AWS",
    "Azure",
    "DevOps",
    "Android",
    "Swift",
    "Ruby",
    "C#",
    "Go",
    "PHP",
    "C++",
    "Kotlin",
    "Scala",
    "Rust",
    "Flutter",
    "Vue.js",
    "Angular",
    "Express.js",
    "Laravel",
    "Team Lead", // Example of a soft skill
    "Communication", // Soft Skills
    "Problem Solving",
    "Time Management",
    "Leadership",
    "Teamwork",
    "Adaptability",
    "Creativity",
    "Collaboration",
    "Critical Thinking",
    "Decision Making",
    "Conflict Resolution",
    "Public Speaking",
    "Emotional Intelligence",
    "Work Ethic",
  ];


  const handleAddSkill = (skillType, skill, years) => {
    if (
      skillType === "hard" &&
      skill &&
      years &&
      skills.hardSkills.length < 30
    ) {
      const newSkillObject = { skill, years };
      setSkills({
        ...skills,
        hardSkills: [...skills.hardSkills, newSkillObject],
        newHardSkill: "",
        hardSkillYears: "",
      });
    } else if (
      skillType === "soft" &&
      skill &&
      years &&
      skills.softSkills.length < 30
    ) {
      const newSkillObject = { skill, years };
      setSkills({
        ...skills,
        softSkills: [...skills.softSkills, newSkillObject],
        newSoftSkill: "",
        softSkillYears: "",
      });
    }
  };

  const handleRemoveSkill = (skillType, index) => {
    if (skillType === "hard") {
      const updatedHardSkills = skills.hardSkills.filter((_, i) => i !== index);
      setSkills({ ...skills, hardSkills: updatedHardSkills });
    } else if (skillType === "soft") {
      const updatedSoftSkills = skills.softSkills.filter((_, i) => i !== index);
      setSkills({ ...skills, softSkills: updatedSoftSkills });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (skills.hardSkills.length === 0 || skills.softSkills.length === 0) {
      alert("Please add at least one hard skill and one soft skill.");
      return;
    }
    onNext({ hardSkills: skills.hardSkills, softSkills: skills.softSkills });

    // Add skills to the API
    const addSkills = async (skillsData) => {
      const url = API;
      const token = localStorage.getItem('token');;
      const api = await axios.post(`${url}/skills/add`, skillsData, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        withCredentials: true,
      });
      alert(api.data.message);
      console.log("at the skills ",api.data)
    };

    addSkills({ hardSkills: skills.hardSkills, softSkills: skills.softSkills });
  };

  return (
    <Box sx={{ maxWidth: 750, mx: "auto", mt: 5, }}>
      <Card sx={{p:2}}>
        <form onSubmit={handleSubmit}>
          <h1>Skills</h1>

          {/* Hard Skills Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={skills.newHardSkill}
                onChange={(e, value) =>
                  setSkills({ ...skills, newHardSkill: value })
                }
                options={skillSuggestions}
                renderInput={(params) => (
                  <TextField {...params} label="Add Hard Skill" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Years of Experience"
                type="number"
                value={skills.hardSkillYears}
                onChange={(e) =>
                  setSkills({ ...skills, hardSkillYears: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleAddSkill(
                    "hard",
                    skills.newHardSkill,
                    skills.hardSkillYears
                  )
                }
                disabled={skills.hardSkills.length >= 30}
                fullWidth
                style={{ marginBottom: "16px" }}
              >
                Add Hard Skill
              </Button>
            </Grid>

            {/* Hard Skills List */}
            <Grid item xs={12}>
              <Box display="flex" flexWrap="wrap" gap={2} marginBottom={2}>
                {skills.hardSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={`${skill.skill} - ${skill.years} years`}
                    color="secondary"
                    onDelete={() => handleRemoveSkill("hard", index)}
                    style={{ margin: "4px" }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Soft Skills Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={skills.newSoftSkill}
                onChange={(e, value) =>
                  setSkills({ ...skills, newSoftSkill: value })
                }
                options={skillSuggestions}
                renderInput={(params) => (
                  <TextField {...params} label="Add Soft Skill" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Years of Experience"
                type="number"
                value={skills.softSkillYears}
                onChange={(e) =>
                  setSkills({ ...skills, softSkillYears: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleAddSkill(
                    "soft",
                    skills.newSoftSkill,
                    skills.softSkillYears
                  )
                }
                disabled={skills.softSkills.length >= 30}
                fullWidth
                style={{ marginBottom: "16px" }}
              >
                Add Soft Skill
              </Button>
            </Grid>

            {/* Soft Skills List */}
            <Grid item xs={12}>
              <Box display="flex" flexWrap="wrap" gap={2} marginBottom={2}>
                {skills.softSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={`${skill.skill} - ${skill.years} years`}
                    color="secondary"
                    onDelete={() => handleRemoveSkill("soft", index)}
                    style={{ margin: "4px" }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Submit Button (Centered) */}
          <Grid container justifyContent="center" style={{ marginTop: "16px" }}>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default SkillsForm;
