import React, { useState } from "react";
import {API} from '../../constant/constant';
import {
  TextField,
  Box,
  Button,
  Card,
  Grid,
  Typography,
  Container,
  Chip,
} from "@mui/material";

import axios from 'axios'

const PatentDetailsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    patentTitle: data.patentTitle || "",
    patentNumber: data.patentNumber || "",
    issuingAuthority: data.issuingAuthority || "",
    filingApprovalDate: data.filingApprovalDate || "",
    patentDescription: data.patentDescription || "",
    patentList: data.patentList || [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPatent = () => {
    const {
      patentTitle,
      patentNumber,
      issuingAuthority,
      filingApprovalDate,
      patentDescription,
      patentList,
    } = formData;

    if (
      !patentTitle ||
      !patentNumber ||
      !issuingAuthority ||
      !filingApprovalDate
    ) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const newPatent = {
      patentTitle,
      patentNumber,
      issuingAuthority,
      filingApprovalDate,
      patentDescription,
    };
    setFormData({
      ...formData,
      patentList: [...formData.patentList, newPatent],
      patentTitle: "",
      patentNumber: "",
      issuingAuthority: "",
      filingApprovalDate: "",
      patentDescription: "",
    });
  };

  const handleRemovePatent = (index) => {
    const updatedPatents = formData.patentList.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      patentList: updatedPatents,
    });
  };

  // Patents api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addPatents = async (Patents) => {
    const api = await axios.post(
      `${url}/patent/update`,
      { Patents },
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
    if (formData.patentList.length === 0) {
      alert("Please add at least one patent.");
      return;
    }
    onNext({ patentList: formData.patentList });
    addPatents(formData.patentList);
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
          Patent Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Patent Title"
                name="patentTitle"
                value={formData.patentTitle}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Patent Number"
                name="patentNumber"
                value={formData.patentNumber}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Issuing Authority"
                name="issuingAuthority"
                value={formData.issuingAuthority}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Filing/Approval Date"
                name="filingApprovalDate"
                type="date"
                value={formData.filingApprovalDate}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Patent Description"
                name="patentDescription"
                value={formData.patentDescription}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPatent}
                fullWidth
                sx={{ mb: 2 }}
              >
                Add Patent
              </Button>
            </Grid>
          </Grid>

          {/* Patent List */}
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" gap={2} marginBottom={2}>
              {formData.patentList.map((patent, index) => (
                <Chip
                  key={index}
                  label={`${patent.patentTitle} - ${patent.patentNumber}`}
                  color="secondary"
                  onDelete={() => handleRemovePatent(index)}
                />
              ))}
            </Box>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              sx={{ flex: 1, mr: 1 }}
              onClick={() => onNext({})}
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

export default PatentDetailsForm;
