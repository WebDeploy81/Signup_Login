import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryStateCitySelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

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
      setSelectedState("");
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Fetch cities when state is selected
  const fetchCities = async (state) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        { country: selectedCountry, state }
      );
      setCities(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Country, State, City Selector</h2>

      {/* Country Dropdown */}
      <div>
        <label>Select Country:</label>
        <select
          value={selectedCountry}
          onChange={(e) => {
            const country = e.target.value;
            setSelectedCountry(country);
            fetchStates(country);
          }}
        >
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown */}
      {states.length > 0 && (
        <div>
          <label>Select State:</label>
          <select
            value={selectedState}
            onChange={(e) => {
              const state = e.target.value;
              setSelectedState(state);
              fetchCities(state);
            }}
          >
            <option value="">-- Select State --</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* City Dropdown */}
      {cities.length > 0 && (
        <div>
          <label>Select City:</label>
          <select>
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CountryStateCitySelector;
