import React, { useState } from "react";
import {API} from '../../constant/constant';
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Autocomplete,
} from "@mui/material";

import axios from 'axios'

const LanguageProficiencyForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    languages: data.languages || [],
    newLanguage: "",
    newProficiency: "",
  });

  const handleLanguageChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedLanguages = prevData.languages.map((language, i) =>
        i === index ? { ...language, [name]: value } : language
      );
      return { ...prevData, languages: updatedLanguages };
    });
  };

  const handleAddLanguage = () => {
    setFormData((prevData) => ({
      ...prevData,
      languages: [
        ...prevData.languages,
        { name: prevData.newLanguage, proficiency: prevData.newProficiency },
      ],
      newLanguage: "",
      newProficiency: "",
    }));
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: updatedLanguages });
  };

  // Languages api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addLanguages = async (Languages) => {
    const api = await axios.post(
      `${url}/language/update`,
      { Languages },
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
    onNext(formData); // Proceed with current data
    addLanguages(formData)
  };

  const handleSkip = () => {
    onNext({}); // Proceed with an empty object when skipping
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 3 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          Languages & Proficiency
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Language Input Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={formData.newLanguage}
                onChange={(e, value) =>
                  setFormData({ ...formData, newLanguage: value })
                }
                options={[
                  "English",
                  "Spanish",
                  "French",
                  "German",
                  "Chinese",
                  "Arabic",
                ]} // Example languages
                renderInput={(params) => (
                  <TextField {...params} label="Add Language" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Proficiency</InputLabel>
                <Select
                  value={formData.newProficiency}
                  onChange={(e) =>
                    setFormData({ ...formData, newProficiency: e.target.value })
                  }
                  label="Proficiency"
                >
                  <MenuItem value="">Select Proficiency</MenuItem>
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Fluent">Fluent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddLanguage}
                disabled={!formData.newLanguage || !formData.newProficiency}
                sx={{ mt: 2 }}
              >
                Add Language
              </Button>
            </Grid>
          </Grid>

          {/* Display List of Languages Added */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {formData.languages.map((language, index) => (
                  <Chip
                    key={index}
                    label={`${language.name} - ${language.proficiency}`}
                    color="secondary"
                    onDelete={() => handleRemoveLanguage(index)}
                    sx={{ margin: "4px" }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="button"
              onClick={handleSkip}
              variant="outlined"
              color="secondary"
              sx={{ flex: 1 }}
            >
              Skip
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: 1 }}
            >
              Next
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default LanguageProficiencyForm;
