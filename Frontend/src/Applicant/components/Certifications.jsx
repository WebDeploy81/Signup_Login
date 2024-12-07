import React, { useState } from "react";
import { TextField, Button, Grid, Box, Card, Chip } from "@mui/material";
import axios from 'axios'
import {API} from '../../constant/constant';
const CertificationForm = ({ onNext, data }) => {
  const [certifications, setCertifications] = useState({
    certificationList: data.certificationList || [],
    certificationName: "",
    issuingAuthority: "",
    dateOfCompletion: "",
    validityPeriod: "",
    credentialID: "",
    url: "",
  });

  const handleAddCertification = () => {
    const {
      certificationName,
      issuingAuthority,
      dateOfCompletion,
      validityPeriod,
      credentialID,
      url,
      certificationList,
    } = certifications;

    if (!certificationName || !issuingAuthority || !dateOfCompletion) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const newCertification = {
      certificationName,
      issuingAuthority,
      dateOfCompletion,
      validityPeriod,
      credentialID,
      url,
    };

    setCertifications({
      ...certifications,
      certificationList: [
        ...certifications.certificationList,
        newCertification,
      ],
      certificationName: "",
      issuingAuthority: "",
      dateOfCompletion: "",
      validityPeriod: "",
      credentialID: "",
      url: "",
    });
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = certifications.certificationList.filter(
      (_, i) => i !== index
    );
    setCertifications({
      ...certifications,
      certificationList: updatedCertifications,
    });
  };

  // Certification api connection
  const url = API;
  const token = localStorage.getItem('token');;
  const addCertification = async (WorkExperience) => {
    const api = await axios.post(
      `${url}/certificate/upload`,
      { WorkExperience },
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
    if (certifications.certificationList.length === 0) {
      alert("Please add at least one certification.");
      return;
    }
    onNext({ certificationList: certifications.certificationList });
    // console.log("at the certification = ", certifications.certificationList);
    addCertification(certifications.certificationList);
  };

  return (
    <Box sx={{ maxWidth: 750, mx: "auto", mt: 5 }}>
      <Card sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <h1>Certifications</h1>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Certification Name"
                value={certifications.certificationName}
                onChange={(e) =>
                  setCertifications({
                    ...certifications,
                    certificationName: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Issuing Authority"
                value={certifications.issuingAuthority}
                onChange={(e) =>
                  setCertifications({
                    ...certifications,
                    issuingAuthority: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Completion"
                type="date"
                value={certifications.dateOfCompletion}
                onChange={(e) =>
                  setCertifications({
                    ...certifications,
                    dateOfCompletion: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Validity Period"
                value={certifications.validityPeriod}
                onChange={(e) =>
                  setCertifications({
                    ...certifications,
                    validityPeriod: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Credential ID"
                value={certifications.credentialID}
                onChange={(e) =>
                  setCertifications({
                    ...certifications,
                    credentialID: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="URL"
                value={certifications.url}
                onChange={(e) =>
                  setCertifications({
                    ...certifications,
                    url: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCertification}
                fullWidth
                sx={{ mb: 2 }}
              >
                Add Certification
              </Button>
            </Grid>
          </Grid>

          {/* Certification List */}
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" gap={2} marginBottom={2}>
              {certifications.certificationList.map((certification, index) => (
                <Chip
                  key={index}
                  label={`${certification.certificationName} - ${certification.issuingAuthority}`}
                  color="secondary"
                  onDelete={() => handleRemoveCertification(index)}
                />
              ))}
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid container justifyContent="center" style={{ marginTop: "16px" }}>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default CertificationForm;
