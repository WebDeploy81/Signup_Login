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

import axios from 'axios'

const PublicationDetailsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    paperTitle: data.paperTitle || "",
    journalConference: data.journalConference || "",
    publicationYear: data.publicationYear || "",
    coAuthors: data.coAuthors || "",
    impactFactor: data.impactFactor || "",
    url: data.url || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Research api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addResearch = async (Research) => {
    const api = await axios.post(
      `${url}/research_publication/update`,
      { Research },
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
    addResearch(formData)
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
          Publication Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              {
                label: "Paper Title",
                name: "paperTitle",
                type: "text",
                placeholder: "Enter the paper title...",
              },
              {
                label: "Journal/Conference Name",
                name: "journalConference",
                type: "text",
                placeholder: "Enter the journal or conference name...",
              },
              {
                label: "Year of Publication",
                name: "publicationYear",
                type: "number",
                placeholder: "Enter the publication year...",
              },
              {
                label: "Co-Authors",
                name: "coAuthors",
                type: "text",
                placeholder: "Enter co-authors (comma-separated)...",
              },
              {
                label: "Impact Factor/Index",
                name: "impactFactor",
                type: "text",
                placeholder: "Enter the impact factor or index...",
              },
              {
                label: "URL",
                name: "url",
                type: "url",
                placeholder: "Enter the publication URL...",
              },
            ].map(({ label, name, type, placeholder }) => (
              <Grid item xs={12} key={name}>
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

export default PublicationDetailsForm;
