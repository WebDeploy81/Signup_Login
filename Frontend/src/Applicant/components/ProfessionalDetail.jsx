import React, { useState } from "react";
import {API} from '../../constant/constant';
import { TextField, Box, Button, Grid, Card, Typography } from "@mui/material";
import axios from 'axios'

const ProfessionalDetailsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    professionalSummary: data.professionalSummary || "",
    careerObjectives: data.careerObjectives || "",
    valueProposition: data.valueProposition || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Professional_Detail api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addProfessional_Detail = async (Professional_Detail) => {
    const api = await axios.post(
      `${url}/profile_summery/update`,
      { Professional_Detail },
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
    onNext(formData); // Proceed with current data even if fields are empty
    addProfessional_Detail(formData)
  };

  const handleSkip = () => {
    onNext({}); // Proceed with an empty object when skipping
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Card sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          Professional Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              {
                label: "Professional Summary",
                name: "professionalSummary",
                type: "text",
                placeholder: "Enter your professional summary...",
              },
              {
                label: "Career Objectives",
                name: "careerObjectives",
                type: "text",
                placeholder: "Enter your career objectives...",
              },
              {
                label: "Value Proposition",
                name: "valueProposition",
                type: "text",
                placeholder: "Enter your value proposition...",
              },
            ].map(({ label, name, type, placeholder }) => (
              <Grid item xs={12} key={name}>
                <TextField
                  label={label}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  variant="outlined"
                  fullWidth
                  value={formData[name]}
                  onChange={handleInputChange}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              type="button"
              onClick={handleSkip}
              variant="contained"
              color="secondary"
              sx={{ flex: 1, mr: 1 }}
            >
              Skip
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: 1, ml: 1 }}
            >
              Next
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default ProfessionalDetailsForm;
