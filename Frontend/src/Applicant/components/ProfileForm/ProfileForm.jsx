import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import {
  TextField,
  Button,
  Grid,
  Box,
  InputAdornment,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import PhoneNumberForm from "./Phone";
import LocationSelector from "./Location";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axios from "axios";

const ProfileForm = ({ onNext, data ={}  }) => {

  console.log("data ata profile = ",data)
  const [firstName, setFirstName] = useState(data.firstName || "");
  const [lastName, setLastName] = useState(data.lastName || "");
  const [email, setEmail] = useState(data.email || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [location, setLocation] = useState(
    data.location || { country: "", state: "", city: "" }
  );
  const [profilePicture, setProfilePicture] = useState(
    data.profilePicture || null
  );
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4 scale
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility

  const [showPic, setshowPic] = useState("")

  // Cleanup for profile picture
  useEffect(() => {
    return () => {
      if (showPic) URL.revokeObjectURL(showPic);
    };
  }, [showPic]);

  // Function to validate the phone number
  const validatePhoneNumber = (value) => {
    const number = value.replace(/\s+/g, ""); // Remove spaces
    const isNumberValid = /^\d{10}$/.test(number); // 10 digits
    if (!isNumberValid) {
      setIsValid(false);
      setErrorMessage("Valid 10-digit phone number is required.");
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
    setPhone(value);
  };

  // Validation for all fields
  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Valid email is required.";
    if (!phone.trim() || !/^\d{10}$/.test(phone))
      newErrors.phone = "Valid 10-digit phone number is required.";
    if (!profilePicture)
      newErrors.profilePicture = "Profile picture is required.";
    if (!password.trim() || password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Profile api connection
  // const url = "http://localhost:5000";
  const token = localStorage.getItem('token');
 const addProfile = async (
   firstName,
   lastName,
   email,
   phone,
   location,
   profilePicture,
   password
 ) => {
   try {
     const api = await axios.post(
       `${API_URL}/profile/create`,
       {
         firstName,
         lastName,
         email,
         phone,
         location,
         profilePicture,
         password,
       },
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
     alert(api.data.message); // Success message
   } catch (error) {
     console.error("Error creating profile:", error.response?.data || error);
     alert(
       error.response?.data?.message || "An error occurred. Please try again."
     ); // Backend error message
   }
 };



  // file upload
  const addPic = async (file) => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const api = await axios.post(`${data.url}/file/upload-profile-pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token:token,
						email:localStorage.getItem('email'),
						mobile:localStorage.getItem('mobile'),
        },
        withCredentials: true,
      });

      // console.log(api.data);
      alert(api.data.message);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    }
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext({
        firstName,
        lastName,
        email,
        phone,
        location,
        profilePicture,
        password,
      });

      // data submit - api
      addProfile(
        firstName,
        lastName,
        email,
        phone,
        location,
        profilePicture,
        password
      );

      // file upload - api
      addPic(profilePicture)
    }

    console.log(
      "data at ,profiel.jsx ",
      firstName,
      lastName,
      email,
      phone,
      location,
      profilePicture,
      password
    );
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setshowPic(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, showPic: null }));
    }
    setProfilePicture(file)
  };

  // Handle password change and strength update
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Basic password strength indicator
    let strength = 0;
    if (newPassword.length >= 8) strength++;
    if (/[A-Z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++;
    setPasswordStrength(strength);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // console.log("profile pic = ",profilePicture)

  return (
    <Box sx={{ marginTop: 5 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Personal Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          {/* First Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              variant="outlined"
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              variant="outlined"
            />
          </Grid>

          {/* Email Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <LocationSelector location={location} setLocation={setLocation} />
            {errors.location && (
              <Typography color="error">{errors.location}</Typography>
            )}
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12}>
            <PhoneNumberForm
              phone={phone}
              setPhone={validatePhoneNumber}
              errorMessage={errorMessage}
              isValid={isValid}
            />
          </Grid>

          {/* Profile Picture */}
          <Grid item xs={12}>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: "none" }}
            />
            <label htmlFor="profilePicture">
              <Button variant="outlined" component="span" fullWidth>
                Upload Profile Picture
              </Button>
            </label>
            {errors.profilePicture && (
              <Typography color="error" variant="body2">
                {errors.profilePicture}
              </Typography>
            )}
            {profilePicture && (
              <Box sx={{ marginTop: 2, textAlign: "center" }}>
                <Avatar
                  src={showPic}
                  alt="Profile Preview"
                  sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
              </Box>
            )}
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Create Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="body2"
              color={
                passwordStrength >= 3
                  ? "success.main"
                  : passwordStrength >= 2
                  ? "warning.main"
                  : "error.main"
              }
            >
              Password Strength:{" "}
              {["Weak", "Fair", "Good", "Strong"][passwordStrength]}
            </Typography>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProfileForm;
