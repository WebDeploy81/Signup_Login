import React, { useState } from "react";
import {API} from '../../constant/constant';
import {
  Container,
  Card,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Grid,
  TextareaAutosize,
} from "@mui/material";

import axios from 'axios'

const SpecializedFieldsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    specializedFields: data.specializedFields || [],
    industrySpecificKnowledge: data.industrySpecificKnowledge || "",
  });

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prevData) => {
      const updatedFields = checked
        ? [...prevData[name], value]
        : prevData[name].filter((field) => field !== value);

      return {
        ...prevData,
        [name]: updatedFields,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Area_of_Expertise api connection
  const url = API;
  const token = localStorage.getItem('token');
  const addArea_of_Expertise = async (Area_of_Expertise) => {
    const api = await axios.post(
      `${url}/experties_area/update`,
      { Area_of_Expertise },
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
    onNext(formData);
    addArea_of_Expertise(formData)
  };

  const handleSkip = () => {
    onNext({});
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          Specialized Fields & Industry Knowledge
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Specialized Fields */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="div"
                color="text.secondary"
                gutterBottom
              >
                Specialized Fields:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {[
                  "Data Science",
                  "AI",
                  "Machine Learning",
                  "Cybersecurity",
                  "Cloud Computing",
                ].map((field, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        value={field}
                        checked={formData.specializedFields.includes(field)}
                        onChange={handleCheckboxChange}
                        name="specializedFields"
                        color="primary"
                      />
                    }
                    label={field}
                  />
                ))}
              </Box>
            </Grid>

            {/* Industry-Specific Knowledge */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="div"
                color="text.secondary"
                gutterBottom
              >
                Industry-Specific Knowledge:
              </Typography>
              <TextareaAutosize
                minRows={4}
                name="industrySpecificKnowledge"
                placeholder="Enter your industry-specific knowledge..."
                value={formData.industrySpecificKnowledge}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
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
              sx={{ flex: 1, ml: 2 }}
            >
              Next
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default SpecializedFieldsForm;
