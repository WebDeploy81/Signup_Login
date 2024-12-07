import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  RadioGroup,
  Radio,
  FormLabel,
  Box,
  Paper,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { institutions, degrees, specializations } from "./data";
import {API} from '../../constant/constant';
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

  const [educationDetails, setEducationDetails] = useState(
    data.educationDetails || [
      { ...initialEducationState, level: "10th" },
      { ...initialEducationState, level: "12th" },
      { ...initialEducationState, level: "UG" },
      // { ...initialEducationState, level: "PG" },
      // { ...initialEducationState, level: "PhD" },
    ]
  );

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
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/education/add`,
        { educationDetails },
        {
          headers: {
            "Content-Type": "application/json",
            token:token,
						email:localStorage.getItem('email'),
						mobile:localStorage.getItem('mobile'),
          },
        }
      );
      alert(response.data.message);
      onNext({ educationDetails });
    } catch (error) {
      console.error(error);
      alert("Error submitting the form. Please try again.");
    }
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

              {/* Institution Autocomplete */}
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={edu.institution}
                  onInputChange={(e, newInputValue) =>
                    handleChange(index, "institution", newInputValue)
                  }
                  options={institutions[edu.level] || []}
                  renderInput={(params) => (
                    <TextField {...params} label="Institution" required />
                  )}
                  freeSolo
                />
              </FormControl>

              {/* Degree Autocomplete */}
              {(edu.level === "UG" || edu.level === "PG") && (
                <FormControl fullWidth margin="normal">
                  <Autocomplete
                    value={edu.degree}
                    onInputChange={(e, newInputValue) =>
                      handleChange(index, "degree", newInputValue)
                    }
                    options={degrees[edu.level] || []}
                    renderInput={(params) => (
                      <TextField {...params} label="Degree" required />
                    )}
                    freeSolo
                  />
                </FormControl>
              )}

              {/* Specialization Autocomplete */}
              {edu.degree && (
                <FormControl fullWidth margin="normal">
                  <Autocomplete
                    value={edu.specialization}
                    onInputChange={(e, newInputValue) =>
                      handleChange(index, "specialization", newInputValue)
                    }
                    options={specializations[edu.level]?.[edu.degree] || []}
                    renderInput={(params) => (
                      <TextField {...params} label="Specialization" required />
                    )}
                    freeSolo
                  />
                </FormControl>
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
                label="End Date"
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
            </Box>
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Next
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EducationForm;
