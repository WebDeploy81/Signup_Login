import React, { useState } from "react";
import {API} from '../../constant/constant';
import {
  TextField,
  Box,
  Button,
  Card,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import axios from "axios";

const ProjectDetailsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    projectTitle: data.projectTitle || "",
    objective: data.objective || "",
    toolsTechnologies: data.toolsTechnologies || "",
    duration: data.duration || "",
    outcome: data.outcome || "",
    url: data.url || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Projects api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addProjects = async (Projects) => {
    const api = await axios.post(
      `${url}/project/update`,
      { Projects },
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
    addProjects(formData)
  };

  const handleSkip = () => {
    onNext({}); // Proceed with an empty object when skipping
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          Project Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              {
                label: "Project Title",
                name: "projectTitle",
                placeholder: "Enter the project title...",
              },
              {
                label: "Objective",
                name: "objective",
                placeholder: "What was the objective of the project?",
              },
              {
                label: "Tools and Technologies Used",
                name: "toolsTechnologies",
                placeholder: "List the tools and technologies used...",
              },
              {
                label: "Duration",
                name: "duration",
                placeholder: "Enter the duration (e.g., 3 months)...",
              },
              {
                label: "Outcome/Results",
                name: "outcome",
                placeholder: "Describe the outcome or results achieved...",
              },
              {
                label: "URL",
                name: "url",
                placeholder: "Enter the project URL (if any)...",
              },
            ].map(({ label, name, placeholder }) => (
              <Grid item xs={12} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  placeholder={placeholder}
                  variant="outlined"
                  value={formData[name]}
                  onChange={handleInputChange}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
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
    </Container>
  );
};

export default ProjectDetailsForm;
