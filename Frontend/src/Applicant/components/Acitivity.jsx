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

const ActivitiesForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    sportsAndAthletics: data.sportsAndAthletics || "",
    artsAndCulture: data.artsAndCulture || "",
    leadershipRoles: data.leadershipRoles || "",
    communityService: data.communityService || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Activity api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addActivity = async (Activity) => {
    const api = await axios.post(
      `${url}/activity/upload`,
      { Activity },
      {
        headers: {
          "Content-Type": "application/json",
          token:token,
						email:localStorage.getItem('email'),
						mobile:localStorage.getItem('mobile'),
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
    addActivity(formData)
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
          Extracurricular Activities
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              {
                label: "Sports and Athletics",
                name: "sportsAndAthletics",
                placeholder: "Details about sports participation...",
              },
              {
                label: "Arts and Cultural Activities",
                name: "artsAndCulture",
                placeholder: "Details about arts and cultural involvement...",
              },
              {
                label: "Leadership Roles",
                name: "leadershipRoles",
                placeholder: "Details about leadership roles...",
              },
              {
                label: "Community Services/Volunteering",
                name: "communityService",
                placeholder: "Details about community services...",
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

export default ActivitiesForm;
