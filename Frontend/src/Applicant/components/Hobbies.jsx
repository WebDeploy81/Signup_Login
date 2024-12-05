import React, { useState } from "react";
import {API} from '../../constant/constant';
import {
  TextField,
  Box,
  Button,
  Grid,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import axios from "axios";

const PersonalInterestsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    creativeHobbies: data.creativeHobbies || "",
    recreationalActivities: data.recreationalActivities || "",
    sportsFitnessActivities: data.sportsFitnessActivities || [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      sportsFitnessActivities: checked
        ? [...prevData.sportsFitnessActivities, value]
        : prevData.sportsFitnessActivities.filter((item) => item !== value),
    }));
  };

  // Hobbies api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addHobbies = async (Hobbies) => {
    const api = await axios.post(
      `${url}/hobbie/update`,
      { Hobbies },
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
    addHobbies(formData)
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
          Personal Interests
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Creative Hobbies Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Creative Hobbies</InputLabel>
                <Select
                  label="Creative Hobbies"
                  name="creativeHobbies"
                  value={formData.creativeHobbies}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select a creative hobby...</MenuItem>
                  <MenuItem value="Writing">Writing</MenuItem>
                  <MenuItem value="Painting">Painting</MenuItem>
                  <MenuItem value="Photography">Photography</MenuItem>
                  <MenuItem value="Sculpture">Sculpture</MenuItem>
                  <MenuItem value="Crafting">Crafting</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Recreational Activities Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Recreational Activities</InputLabel>
                <Select
                  label="Recreational Activities"
                  name="recreationalActivities"
                  value={formData.recreationalActivities}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">
                    Select a recreational activity...
                  </MenuItem>
                  <MenuItem value="Reading">Reading</MenuItem>
                  <MenuItem value="Traveling">Traveling</MenuItem>
                  <MenuItem value="Gardening">Gardening</MenuItem>
                  <MenuItem value="Music">Music</MenuItem>
                  <MenuItem value="Cooking">Cooking</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sports or Fitness Activities Checkbox */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="white">
                Sports or Fitness Activities
              </Typography>
              <Grid container spacing={2}>
                {[
                  "Yoga",
                  "Running",
                  "Swimming",
                  "Cycling",
                  "Gym",
                  "Football",
                  "Basketball",
                  "Tennis",
                ].map((activity) => (
                  <Grid item xs={6} md={4} lg={3} key={activity}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.sportsFitnessActivities.includes(
                            activity
                          )}
                          onChange={handleCheckboxChange}
                          value={activity}
                          color="primary"
                        />
                      }
                      label={activity}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
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

export default PersonalInterestsForm;
