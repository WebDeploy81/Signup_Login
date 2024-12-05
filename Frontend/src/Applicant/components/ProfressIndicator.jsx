import React from "react";
import { Stepper, Step, StepLabel, Typography, Box } from "@mui/material";

const ProgressIndicator = ({ steps, currentStep, onStepClick }) => {
  return (
    <Box
      sx={{
        width: "800px",
        overflowX: "auto",
        whiteSpace: "nowrap",
        margin: "auto",
        paddingBottom: "10px", // For better scrollbar styling
        "&::-webkit-scrollbar": {
          height: "8px", // Scrollbar height
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888", // Scrollbar color
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555", // Hover effect on scrollbar
        },
      }}
    >
      <Stepper
        activeStep={currentStep}
        alternativeLabel
        sx={{
          display: "flex",
          flexWrap: "nowrap", // Keep steps in a single row
          "& .MuiStepConnector-line": {
            borderColor: currentStep === steps.length ? "#FFB800" : "gray", // Line color changes to warm gold on completion
          },
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            onClick={() => onStepClick(index)}
            sx={{
              marginRight: "30px", // Add space between steps
              cursor: "pointer",
            }}
          >
            <StepLabel
              sx={{
                color:
                  index < currentStep
                    ? "#FFB800" // Warm gold for completed steps
                    : index === currentStep
                    ? "green" // Green for active step
                    : "gray", // Gray for inactive steps
                textDecoration: "none", // Remove underline
                "& .MuiStepIcon-root": {
                  color:
                    index < currentStep
                      ? "#FFB800" // Warm gold icon for completed steps
                      : index === currentStep
                      ? "green" // Green icon for active step
                      : "gray", // Gray icon for inactive steps
                },
              }}
            >
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mt: 2 }}
      >
        Step {currentStep + 1} of {steps.length}
      </Typography>
    </Box>
  );
};

export default ProgressIndicator;
