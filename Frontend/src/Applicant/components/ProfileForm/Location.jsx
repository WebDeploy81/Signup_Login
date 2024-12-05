import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";

const LocationSelector = ({ location, setLocation }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { country, state, city } = location;

  // Fetch all countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country is selected
  const fetchStates = async (country) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country }
      );
      setStates(response.data.data.states || []);
      setCities([]);
      setLocation({ country, state: "", city: "" });
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Fetch cities when state is selected
  const fetchCities = async (state) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        { country, state }
      );
      setCities(response.data.data || []);
      setLocation({ ...location, state, city: "" });
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleChange = (level, value) => {
    if (level === "country") {
      setLocation({ country: value, state: "", city: "" });
      fetchStates(value);
    } else if (level === "state") {
      setLocation({ ...location, state: value, city: "" });
      fetchCities(value);
    } else if (level === "city") {
      setLocation({ ...location, city: value });
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ marginBottom: 2 }}>
          <Autocomplete
            options={countries.map((country) => country.country)}
            value={country}
            onChange={(e, value) => handleChange("country", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Country"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>

        {country && (
          <Box sx={{ marginBottom: 2 }}>
            <Autocomplete
              options={states.map((state) => state.name)}
              value={state}
              onChange={(e, value) => handleChange("state", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select State"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Box>
        )}

        {state && (
          <Box sx={{ marginBottom: 2 }}>
            <Autocomplete
              options={cities}
              value={city}
              onChange={(e, value) => handleChange("city", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select City"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Box>
        )}

        {city && (
          <Box
            sx={{
              marginTop: 3,
              padding: "10px",
              backgroundColor: "#555",
              color: "#f1f1f1",
            }}
          >
            <Typography variant="body1">
              Selected Location: {city}, {state}, {country}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LocationSelector;
