import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
  Typography,
} from "@mui/material";

// Location data (countries, states, and cities)
const locationData = {
  India: {
    Andhra_Pradesh: ["Visakhapatnam", "Vijayawada", "Guntur"],
    Arunachal_Pradesh: ["Itanagar", "Tawang", "Pasighat"],
    Assam: ["Guwahati", "Dibrugarh", "Silchar"],
    Bihar: ["Patna", "Gaya", "Bhagalpur"],
    Chhattisgarh: ["Raipur", "Bilaspur", "Durg"],
    Goa: ["Panaji", "Margao", "Mapusa"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Haryana: ["Gurgaon", "Faridabad", "Panipat"],
    Himachal_Pradesh: ["Shimla", "Manali", "Dharamshala"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    Madhya_Pradesh: ["Bhopal", "Indore", "Gwalior"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Manipur: ["Imphal", "Churachandpur", "Bishnupur"],
    Meghalaya: ["Shillong", "Tura", "Jowai"],
    Mizoram: ["Aizawl", "Lunglei", "Champhai"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
    Punjab: ["Chandigarh", "Ludhiana", "Amritsar"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
    Sikkim: ["Gangtok", "Namchi", "Gyalshing"],
    Tamil_Nadu: ["Chennai", "Coimbatore", "Madurai"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
    Tripura: ["Agartala", "Udaipur", "Dharmanagar"],
    Uttar_Pradesh: ["Lucknow", "Kanpur", "Varanasi"],
    Uttarakhand: ["Dehradun", "Haridwar", "Nainital"],
    West_Bengal: ["Kolkata", "Darjeeling", "Asansol"],
  },
  USA: {
    California: ["Los Angeles", "San Francisco", "San Diego"],
    Texas: ["Houston", "Dallas", "Austin"],
    Florida: ["Miami", "Orlando", "Tampa"],
  },
  Australia: {
    Victoria: ["Melbourne", "Geelong", "Ballarat"],
    Queensland: ["Brisbane", "Gold Coast", "Cairns"],
    New_South_Wales: ["Sydney", "Newcastle", "Wollongong"],
  },
  Canada: {
    Ontario: ["Toronto", "Ottawa", "Hamilton"],
    Quebec: ["Montreal", "Quebec City", "Laval"],
    Alberta: ["Calgary", "Edmonton", "Red Deer"],
  },
  Germany: {
    Bavaria: ["Munich", "Nuremberg", "Augsburg"],
    Berlin: ["Berlin City"],
    Hesse: ["Frankfurt", "Wiesbaden", "Darmstadt"],
  },
  United_Kingdom: {
    England: ["London", "Manchester", "Liverpool"],
    Scotland: ["Edinburgh", "Glasgow", "Aberdeen"],
    Wales: ["Cardiff", "Swansea", "Newport"],
  },
  France: {
    Ile_de_France: ["Paris", "Versailles"],
    Provence: ["Marseille", "Nice", "Avignon"],
    Normandy: ["Rouen", "Caen", "Le Havre"],
  },
  Japan: {
    Tokyo: ["Tokyo City", "Shibuya", "Shinjuku"],
    Osaka: ["Osaka City", "Sakai", "Higashiosaka"],
    Hokkaido: ["Sapporo", "Hakodate", "Asahikawa"],
  },
  China: {
    Beijing: ["Beijing City", "Haidian", "Chaoyang"],
    Shanghai: ["Shanghai City", "Pudong", "Huangpu"],
    Guangdong: ["Guangzhou", "Shenzhen", "Foshan"],
  },
  Brazil: {
    São_Paulo: ["São Paulo City", "Campinas", "Santos"],
    Rio_de_Janeiro: ["Rio City", "Niterói", "Nova Iguaçu"],
    Bahia: ["Salvador", "Feira de Santana", "Vitória da Conquista"],
  },
};

const LocationSelector = ({ location, setLocation }) => {
  const handleChange = (level, value) => {
    if (level === "country") {
      setLocation({ country: value, state: "", city: "" });
    } else if (level === "state") {
      setLocation({ ...location, state: value, city: "" });
    } else if (level === "city") {
      setLocation({ ...location, city: value });
    }
  };

  const { country, state, city } = location;

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", }}>
        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Select Country</InputLabel>
            <Select
              label="Select Country"
              value={country}
              onChange={(e) => handleChange("country", e.target.value)}
            >
              <MenuItem value="">
                <em>-- Select Country --</em>
              </MenuItem>
              {Object.keys(locationData).map((country) => (
                <MenuItem key={country} value={country}>
                  {country.replace(/_/g, " ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {country && (
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select State</InputLabel>
              <Select
                label="Select State"
                value={state}
                onChange={(e) => handleChange("state", e.target.value)}
              >
                <MenuItem value="">
                  <em>-- Select State --</em>
                </MenuItem>
                {Object.keys(locationData[country] || {}).map((state) => (
                  <MenuItem key={state} value={state}>
                    {state.replace(/_/g, " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {state && (
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select City</InputLabel>
              <Select
                label="Select City"
                value={city}
                onChange={(e) => handleChange("city", e.target.value)}
              >
                <MenuItem value="">
                  <em>-- Select City --</em>
                </MenuItem>
                {(locationData[country]?.[state] || []).map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              Selected Location: {city}, {state.replace(/_/g, " ")},{" "}
              {country.replace(/_/g, " ")}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LocationSelector;
