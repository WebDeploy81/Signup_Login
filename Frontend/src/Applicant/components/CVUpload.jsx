import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  LinearProgress,
  Grid,
  Paper,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";

const CVUpload = ({ onNext, data }) => {
  const [cv, setCv] = useState(data.cv || null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if file is either PDF or DOCX
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setCv(file);
      setErrorMessage(""); // Clear any previous error message

      // Simulate file upload progress
      setUploading(true);
      let progress = 0;

      const interval = setInterval(() => {
        if (progress < 100) {
          progress += 10;
          setUploadProgress(progress);
        } else {
          clearInterval(interval);
          setUploading(false);
          onNext({ cv: file }); // Pass the uploaded file to parent
        }
      }, 500);
    } else {
      setCv(null);
      setErrorMessage("Please upload a valid file (PDF or DOCX).");
    }
  };

  return (
    <Box sx={{ my: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Paper sx={{ p: 4, bgcolor: "background.paper", boxShadow: 3 }}>
            <Typography
              variant="h5"
              align="center"
              color="primary"
              gutterBottom
            >
              Upload CV
            </Typography>

            <Box component="form">
              <Button
                variant="contained"
                color="primary"
                component="label"
                fullWidth
                startIcon={<UploadFile />}
                disabled={uploading}
              >
                {cv ? "Change CV" : "Upload CV"}
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  required
                />
              </Button>

              {errorMessage && (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Typography>
              )}

              {uploading && (
                <Box sx={{ mt: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    Uploading... {uploadProgress}%
                  </Typography>
                </Box>
              )}

              {!uploading && cv && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Uploaded File:</strong> {cv.name}
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CVUpload;
