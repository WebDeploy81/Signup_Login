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
} from "@mui/material";

import axios from 'axios'

const InterestDomain = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    domains: data.domains || [], // Array to store selected domains
  });

  const handleInputChange = (e) => {
    const { value, checked } = e.target;

    // Handle checkbox selection for multiple domains
    setFormData((prevData) => {
      const updatedDomains = checked
        ? [...prevData.domains, value]
        : prevData.domains.filter((domain) => domain !== value);

      return {
        ...prevData,
        domains: updatedDomains,
      };
    });
  };

  // Interest_Domain api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addInterest_Domain = async (Interest_Domain) => {
    const api = await axios.post(
      `${url}/domain_intrest/update`,
      { Interest_Domain },
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
    onNext(formData); // Proceed with the current data
    addInterest_Domain(formData)
  };

  const handleSkip = () => {
    onNext({}); // Proceed with an empty object when skipping
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
          Interested Domain
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="div"
                color="text.secondary"
                gutterBottom
              >
                Select your interested domains:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {["Finance", "Energy", "Health", "IT"].map((domain, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        value={domain}
                        checked={formData.domains.includes(domain)}
                        onChange={handleInputChange}
                        name="domains"
                        color="primary"
                      />
                    }
                    label={domain}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

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

export default InterestDomain;
