import React, { useState } from "react";
import {
  Box,
  Paper,
  Alert,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  InputAdornment,
} from "@mui/material";
import Flag from "react-world-flags"; // Import react-world-flags
import axios from "axios";

import {countryList} from './data'

import { API_KEY_PHONE } from "../../config";


const PhoneVerification = ({ phone, setPhone }) => {
  const [country, setCountry] = useState("IN"); // Default country set to India
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiResult, setApiResult] = useState(null); // Store the API result

  // const apiKey = API_KEY_PHONE; // Replace with your API key
  const apiKey = "1006d309da81cbacedbe666762292439"; // Replace with your API key

  // Handle phone input change
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setHasInteracted(true);
  };

  // Handle country change
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setHasInteracted(true);
  };

  // Validate phone number using numverify API
  const validatePhoneNumber = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!phone || !country) {
      setErrorMessage("Phone number and country code are required.");
      setIsValid(false);
      return;
    }

    try {
      const response = await axios.get("http://apilayer.net/api/validate", {
        params: {
          access_key: apiKey,
          number: phone,
          country_code: country,
        },
      });

      const result = response.data;

      if (result.valid) {
        setIsValid(true);
        setErrorMessage("");
        setApiResult(result); // Store the validation result
      } else {
        setIsValid(false);
        setErrorMessage("Invalid phone number format.");
        setApiResult(null);
      }
    } catch (error) {
      setIsValid(false);
      setErrorMessage("Error validating phone number. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{
          width: "100%",
          p: 1,
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
      >
        {/* Country Code Selector */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            onChange={handleCountryChange}
            label="Country"
            fullWidth
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            {countryList.map((item) => (
              <MenuItem key={item.code} value={item.code}>
                <Flag
                  code={item.code}
                  style={{ width: 24, height: 18, marginRight: 8 }}
                />
                {item.country} ({item.phoneCode})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Phone Number Input */}
        <TextField
          label="Phone Number"
          value={phone}
          onChange={handlePhoneChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Flag
                  code={country}
                  style={{ width: 24, height: 18, marginRight: 8 }}
                />
                {countryList.find((item) => item.code === country)?.phoneCode}
              </InputAdornment>
            ),
          }}
          sx={{
            marginTop: "16px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
            backgroundColor: "#fafafa",
          }}
        />

        {/* Validate Button */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <button
            type="button" // Set the button type to "button"
            onClick={validatePhoneNumber}
            style={{
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Validate
          </button>
        </Box>

        {/* Display error or success messages */}
        {hasInteracted && !isValid && errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {isValid && apiResult && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Phone number is valid! <br />
            Carrier: {apiResult.carrier || "N/A"} <br />
            Location: {apiResult.location || "N/A"} <br />
            Line Type: {apiResult.line_type || "N/A"}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default PhoneVerification;
