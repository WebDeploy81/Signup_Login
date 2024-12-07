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

const AchievementsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    academicAchievements: data.academicAchievements || "",
    professionalAwards: data.professionalAwards || "",
    scholarships: data.scholarships || "",
    competitionsWon: data.competitionsWon || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Achivement api connection
  const url = API
  const token=localStorage.getItem('token');
  const  addAchievement = async (Achievement ) => {
    const api = await axios.post(
      `${url}/achievement/update`,
      { Achievement },
      {
        headers: {
          "Content-Type": "application/json",
          token:token,
          email:localStorage.getItem('email'),
          mobile:localStorage.getItem('mobile')
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
    addAchievement(formData)
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
          Achievements & Recognitions
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              {
                label: "Academic Achievements",
                name: "academicAchievements",
                placeholder: "Details about academic achievements...",
              },
              {
                label: "Professional Awards",
                name: "professionalAwards",
                placeholder: "Details about professional awards...",
              },
              {
                label: "Scholarships",
                name: "scholarships",
                placeholder: "Details about scholarships received...",
              },
              {
                label: "Competitions Won",
                name: "competitionsWon",
                placeholder: "Details about competitions you have won...",
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

export default AchievementsForm;
