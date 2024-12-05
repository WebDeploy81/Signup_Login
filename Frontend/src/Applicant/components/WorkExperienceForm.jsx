import React, { useState } from "react";
import {API} from '../../constant/constant';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Chip,
} from "@mui/material";

import axios from "axios";



const WorkExperienceForm = ({ data, onNext }) => {
  const [experiences, setExperiences] = useState(data?.experiences || []);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState("");
  const [location, setLocation] = useState("");
  const [internship, setInternship] = useState(false);
  const [internshipType, setInternshipType] = useState("Unpaid");
  const [internshipAmount, setInternshipAmount] = useState("");
  const [readyToRelocate, setReadyToRelocate] = useState(false);
  
  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState([]);
  
  const maxSkillsAllowed = 30;

  const jobTitleSuggestions = [
    "SDE 1",
    "SDE 2",
    "SDE 3",
    "Java Developer",
    "Python Developer",
    "PHP Developer",
    "React.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
  ];

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const diffYears = endDate.getFullYear() - startDate.getFullYear();
    const diffMonths = endDate.getMonth() - startDate.getMonth();
    const totalMonths = diffYears * 12 + diffMonths;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return { years, months };
  };

  const getTotalSkills = () => {
    return experiences.reduce(
      (total, exp) => total + exp.skills.split(",").length,
      0
    );
  };

  const handleAddExperience = () => {
    if (
      !jobTitle ||
      !company ||
      !startDate ||
      !keyResponsibilities ||
      skills
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const currentSkillsCount = skills.split(",").length;
    const totalSkills = getTotalSkills() + currentSkillsCount;

    if (totalSkills > maxSkillsAllowed) {
      alert(
        `Skill limit exceeded. You can only add up to ${maxSkillsAllowed} skills across all experiences.`
      );
      return;
    }

    const newExperience = {
      jobTitle,
      company,
      startDate,
      endDate,
      keyResponsibilities,
      skillList,
      location,
      internship,
      internshipType,
      internshipAmount,
      readyToRelocate,
    };

    setExperiences([...experiences, newExperience]);
    resetForm();
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const resetForm = () => {
    setJobTitle("");
    setCompany("");
    setStartDate("");
    setEndDate("");
    setKeyResponsibilities("");
    setSkills("");
    setLocation("");
    setInternship(false);
    setInternshipType("Unpaid");
    setInternshipAmount("");
    setReadyToRelocate(false);
  };

  // work Experience api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addWorkExperience = async (WorkExperience) => {
    const api = await axios.post(
      `${url}/experience/add`,
      { WorkExperience },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        withCredentials: true,
      }
    );
    console.log(api.data);

    alert(api.data.message);
  };

  const handleNext = () => {
    if (onNext) {
      onNext(experiences);
      addWorkExperience(experiences)
      console.log("at the add work experienc = ",experiences)
    } else {
      alert("Proceeding to the next step...");
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && skills.trim()) {
      e.preventDefault();

      if (skillList.length >= 30) {
        alert("You can only add up to 30 skills.");
        return;
      }

      setSkills("");
      setSkillList([...skillList, skills.trim()]);
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkillList(skillList.filter((skill) => skill !== skillToDelete));
  };

  return (
    <Box sx={{ maxWidth: 750, mx: "auto", mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Work Experience Form
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  fullWidth
                  select
                >
                  {jobTitleSuggestions.map((job, index) => (
                    <MenuItem key={index} value={job}>
                      {job}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="End Date (Optional)"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Key Responsibilities"
                  value={keyResponsibilities}
                  onChange={(e) => setKeyResponsibilities(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  required
                />
              </Grid>

              {/* skills */}

              <Grid item xs={12}>
                <TextField
                  label="Add Skill"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  onKeyPress={handleKeyPress}
                  fullWidth
                  InputProps={{
                    startAdornment: skills
                      .split(",")
                      .map((skill, index) =>
                        skill.trim() ? (
                          <Chip
                            key={index}
                            label={skill.trim()}
                            onDelete={() => handleDeleteSkill(skill.trim())}
                            color="primary"
                            style={{ marginRight: "5px" }}
                          />
                        ) : null
                      ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {skillList.map((skill, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={skill}
                        onDelete={() => handleDeleteSkill(skill)}
                        color="primary"
                        clickable
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* <Grid item xs={12}>
                <TextField
                  label="Skills (comma-separated)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  fullWidth
                  required
                />
              </Grid> */}

              <Grid item xs={12}>
                <TextField
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Internship"
                  value={internship}
                  onChange={(e) => setInternship(e.target.value === "true")}
                  fullWidth
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </TextField>
              </Grid>
              {internship && (
                <>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="Internship Type"
                      value={internshipType}
                      onChange={(e) => setInternshipType(e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="Paid">Paid</MenuItem>
                      <MenuItem value="Unpaid">Unpaid</MenuItem>
                    </TextField>
                  </Grid>
                  {internshipType === "Paid" && (
                    <Grid item xs={6}>
                      <TextField
                        label="Internship Amount"
                        value={internshipAmount}
                        onChange={(e) => setInternshipAmount(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                  )}
                </>
              )}
              <Grid item xs={6}>
                <TextField
                  select
                  label="Ready to Relocate?"
                  value={readyToRelocate}
                  onChange={(e) =>
                    setReadyToRelocate(e.target.value === "true")
                  }
                  fullWidth
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddExperience}
                  fullWidth
                >
                  Add Experience
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Added Experiences
                </Typography>
                {experiences.map((exp, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography>
                      {exp.jobTitle} at {exp.company} ({exp.startDate} -{" "}
                      {exp.endDate || "Present"}) -{" "}
                      {calculateDuration(exp.startDate, exp.endDate).years}{" "}
                      years,{" "}
                      {calculateDuration(exp.startDate, exp.endDate).months}{" "}
                      months
                    </Typography>
                    <Typography variant="body2">
                      {exp.keyResponsibilities}
                    </Typography>
                    <Typography variant="body2">
                      Skills: {exp.skills}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleRemoveExperience(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  fullWidth
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkExperienceForm;
