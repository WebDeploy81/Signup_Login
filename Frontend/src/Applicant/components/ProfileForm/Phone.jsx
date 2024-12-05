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

// List of countries with codes and flags
const countryList = [
  { code: "IN", country: "India", phoneCode: "+91" },
  { code: "US", country: "United States", phoneCode: "+1" },
  { code: "CA", country: "Canada", phoneCode: "+1" },
  { code: "GB", country: "United Kingdom", phoneCode: "+44" },
  { code: "AU", country: "Australia", phoneCode: "+61" },
  { code: "DE", country: "Germany", phoneCode: "+49" },
  // Add more countries as needed
];

// Utility function to validate phone number based on country code
const validatePhoneNumber = (phone, country) => {
  const phoneNumber = phone.replace(/\D/g, ""); // Remove non-digit characters

  // Example validation logic for length based on country (India: 10 digits, USA: 10 digits, etc.)
  if (country === "IN" && phoneNumber.length === 10) {
    return true;
  } else if (country === "US" && phoneNumber.length === 10) {
    return true;
  }

  return false;
};

const PhoneVerification = ({ phone, setPhone }) => {
  //   const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("IN"); // Default country set to India
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle phone input change
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setHasInteracted(true);

    // Validate phone number as the user types
    const valid = validatePhoneNumber(value, country);
    setIsValid(valid);
    setErrorMessage(valid ? "" : "Invalid phone number format.");
  };

  // Handle country change
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setHasInteracted(true);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{
          width: "100%",
          //   maxWidth: "500px",
          p: 1,
          //   boxShadow: 1,
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
              //   padding: "12px 15px",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            {countryList.map((item) => (
              <MenuItem key={item.code} value={item.code}>
                {/* Displaying flag with country name and phone code */}
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
          error={!isValid}
          helperText={!isValid && "Invalid phone number format"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* Displaying selected country's flag and phone code */}
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
            "& .Mui-error": {
              borderColor: "#f44336",
            },
          }}
        />

        {/* Display error or success messages */}
        {hasInteracted && !isValid && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {hasInteracted && isValid && phone && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Phone number is valid!
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default PhoneVerification;
