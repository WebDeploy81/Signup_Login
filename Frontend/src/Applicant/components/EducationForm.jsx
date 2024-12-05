import React, { useState } from "react";
import { institutions } from "./data";
import {API} from '../../constant/constant';
import axios from "axios";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormLabel,
  Paper,
  Box,
} from "@mui/material";

const EducationForm = ({ onNext, data }) => {
  const initialEducationState = {
    level: "",
    institution: "",
    degree: "",
    specialization: "",
    gradingSystem: "cgpa",
    cgpa: "",
    percentage: "",
    certificate: null,
    startDate: "",
    endDate: "",
    isPursuing: false,
  };

  const degrees = {
    UG: ["BCA", "BSc", "BTech"],
    PG: ["MTech", "MCA", "MCS"],
  };

  const specializations = {
    UG: {
      BCA: ["IT", "CS", "Maths"],
      BSc: ["IT", "Physics", "Chemistry", "Maths"],
      BTech: ["IT", "CS", "Mechanical", "ECE", "Civil"],
    },
    PG: {
      MTech: ["IT", "CS", "Mechanical", "ECE", "Civil"],
      MCA: ["IT", "CS", "Software Engineering"],
      MCS: ["CS", "Data Science", "AI"],
    },
  };

  const [educationDetails, setEducationDetails] = useState(
    data.educationDetails || [
      { ...initialEducationState, level: "10th" },
      { ...initialEducationState, level: "12th" },
      { ...initialEducationState, level: "UG" },
      { ...initialEducationState, level: "PG" },
      { ...initialEducationState, level: "PhD" },
    ]
  );
  const url = API;
  const token = localStorage.getItem('token');;

  const handleChange = (index, field, value) => {
    const updatedEducationDetails = [...educationDetails];
    updatedEducationDetails[index][field] = value;
    setEducationDetails(updatedEducationDetails);
  };

  const handleFileChange = (index, file) => {
    const updatedEducationDetails = [...educationDetails];
    updatedEducationDetails[index].certificate = file;
    setEducationDetails(updatedEducationDetails);
  };

  // Education form API connection
  const addEducation = async (educationDetails) => {
    const api = await axios.post(
      `${url}/education/add`,
      { educationDetails },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const detail of educationDetails) {
      if (!detail.institution) {
        alert(`Please enter the institution for ${detail.level}.`);
        return;
      }
      if (
        detail.gradingSystem === "cgpa" &&
        (detail.cgpa === "" || detail.cgpa < 0 || detail.cgpa > 10)
      ) {
        alert(`Please enter a valid CGPA (0-10) for ${detail.level}.`);
        return;
      }
      if (
        detail.gradingSystem === "percentage" &&
        (detail.percentage === "" ||
          detail.percentage < 0 ||
          detail.percentage > 100)
      ) {
        alert(`Please enter a valid Percentage (0-100) for ${detail.level}.`);
        return;
      }
      if (detail.level === "PhD" && !detail.certificate) {
        alert("Please upload your PhD certificate.");
        return;
      }
      // Validate end date > start date
      if (
        detail.endDate &&
        new Date(detail.endDate) < new Date(detail.startDate)
      ) {
        alert(
          `End date for ${detail.level} cannot be earlier than start date.`
        );
        return;
      }
    }
    onNext({ educationDetails });
    addEducation(educationDetails);
    console.log("at the education form components ...", educationDetails);
  };

  return (
    <Box className="container my-5" sx={{ padding: 3 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="primary"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: 4 }}
        >
          Education Details
        </Typography>
        <form onSubmit={handleSubmit}>
          {educationDetails.map((edu, index) => (
            <Box key={index} sx={{ marginBottom: 4 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {edu.level} Details
              </Typography>

              {/* Institution */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Institution</InputLabel>
                <Select
                  value={edu.institution}
                  onChange={(e) =>
                    handleChange(index, "institution", e.target.value)
                  }
                  label="Institution"
                  required
                >
                  <MenuItem value="">Select Institution</MenuItem>
                  {institutions[edu.level]?.map((inst, i) => (
                    <MenuItem key={i} value={inst}>
                      {inst}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Degree selection for UG/PG */}
              {(edu.level === "UG" || edu.level === "PG") && (
                <>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Degree</InputLabel>
                    <Select
                      value={edu.degree}
                      onChange={(e) =>
                        handleChange(index, "degree", e.target.value)
                      }
                      label="Degree"
                      required
                    >
                      <MenuItem value="">Select Degree</MenuItem>
                      {degrees[edu.level]?.map((degree, i) => (
                        <MenuItem key={i} value={degree}>
                          {degree}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Specialization selection */}
                  {edu.degree && specializations[edu.level][edu.degree] && (
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Specialization</InputLabel>
                      <Select
                        value={edu.specialization}
                        onChange={(e) =>
                          handleChange(index, "specialization", e.target.value)
                        }
                        label="Specialization"
                        required
                      >
                        <MenuItem value="">Select Specialization</MenuItem>
                        {specializations[edu.level][edu.degree].map(
                          (spec, i) => (
                            <MenuItem key={i} value={spec}>
                              {spec}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  )}
                </>
              )}

              {/* Start Date */}
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={edu.startDate}
                onChange={(e) =>
                  handleChange(index, "startDate", e.target.value)
                }
                required={!edu.isPursuing}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* End Date / Currently Pursuing */}
              <TextField
                label="End Date / Currently Pursuing"
                type="date"
                fullWidth
                value={edu.isPursuing ? "" : edu.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                disabled={edu.isPursuing}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={edu.isPursuing}
                    onChange={() =>
                      handleChange(index, "isPursuing", !edu.isPursuing)
                    }
                    name={`isPursuing-${index}`}
                  />
                }
                label="Currently Pursuing"
              />

              {/* Grading System */}
              <FormLabel component="legend">Grading System</FormLabel>
              <RadioGroup
                row
                value={edu.gradingSystem}
                onChange={(e) =>
                  handleChange(index, "gradingSystem", e.target.value)
                }
              >
                <FormControlLabel
                  value="cgpa"
                  control={<Radio />}
                  label="CGPA"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="percentage"
                  control={<Radio />}
                  label="Percentage"
                  labelPlacement="end"
                />
              </RadioGroup>

              {/* CGPA / Percentage */}
              {edu.gradingSystem === "cgpa" ? (
                <TextField
                  label="CGPA"
                  type="number"
                  fullWidth
                  value={edu.cgpa}
                  onChange={(e) => handleChange(index, "cgpa", e.target.value)}
                  required
                  margin="normal"
                  inputProps={{
                    min: 0,
                    max: 10,
                    step: "0.01",
                  }}
                />
              ) : (
                <TextField
                  label="Percentage"
                  type="number"
                  fullWidth
                  value={edu.percentage}
                  onChange={(e) =>
                    handleChange(index, "percentage", e.target.value)
                  }
                  required
                  margin="normal"
                  inputProps={{
                    min: 0,
                    max: 100,
                    step: "0.01",
                  }}
                />
              )}

              {/* File Upload */}
              {edu.level === "PhD" && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1" color="primary" gutterBottom>
                    Upload Certificate
                  </Typography>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    accept="application/pdf"
                  />
                </Box>
              )}
            </Box>
          ))}

          {/* Submit Button */}
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Submit Education Details
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EducationForm;
