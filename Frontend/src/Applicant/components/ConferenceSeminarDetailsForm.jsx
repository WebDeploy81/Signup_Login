import React, { useState } from "react";
import {API} from '../../constant/constant';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Button,
  Card,
  Typography,
  Grid,
  Container,
} from "@mui/material";

import axios from 'axios'

const ConferenceSeminarDetailsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    conferenceName: data.conferenceName || "",
    topicPresented: data.topicPresented || "",
    venueOrganizer: data.venueOrganizer || "",
    year: data.year || "",
    role: data.role || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Seminar api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addSeminar = async (Seminar) => {
    const api = await axios.post(
      `${url}/conferences_seminars/update`,
      { Seminar },
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
    addSeminar(formData)
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
          Conference/Seminar Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              {
                label: "Conference/Seminar Name",
                name: "conferenceName",
                type: "text",
                placeholder: "Enter the conference/seminar name...",
              },
              {
                label: "Topic Presented",
                name: "topicPresented",
                type: "text",
                placeholder: "Enter the topic you presented...",
              },
              {
                label: "Venue/Organizer",
                name: "venueOrganizer",
                type: "text",
                placeholder: "Enter the venue or organizer name...",
              },
              {
                label: "Year",
                name: "year",
                type: "number",
                placeholder: "Enter the year of participation...",
              },
              {
                label: "Role",
                name: "role",
                type: "select",
                options: ["Speaker", "Attendee", "Panelist"], // Role options
              },
            ].map(({ label, name, type, placeholder, options }) => (
              <Grid item xs={12} key={name}>
                {type === "select" ? (
                  <FormControl fullWidth>
                    <InputLabel>{label}</InputLabel>
                    <Select
                      label={label}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      variant="outlined"
                    >
                      <MenuItem value="">
                        <em>Select your role</em>
                      </MenuItem>
                      {options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    label={label}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    variant="outlined"
                    value={formData[name]}
                    onChange={handleInputChange}
                  />
                )}
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

export default ConferenceSeminarDetailsForm;
