import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const Preview = ({ formData, isSubmitted, onEdit, onSubmit }) => {
  return (
    <Box sx={{ padding: 3 }}>
      {/* Submitted Message */}
      {isSubmitted ? (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography
              variant="h5"
              color="success.main"
              sx={{ marginBottom: 2 }}
            >
              Your profile has been submitted successfully!
            </Typography>

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              <strong>Name:</strong> {formData.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Phone:</strong> {formData.phone}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Location:</strong> {formData.location}
            </Typography>

            {/* Education Details */}
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Education Details
            </Typography>
            {formData.educationDetails.map((edu, index) => (
              <Card key={index} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Level:</strong> {edu.level}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>School/Institute:</strong> {edu.institution}
                  </Typography>
                  {edu.degree && (
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Degree:</strong> {edu.degree}
                    </Typography>
                  )}
                  {edu.specialization && (
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Specialization:</strong> {edu.specialization}
                    </Typography>
                  )}
                  {edu.cgpa && (
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>CGPA:</strong> {edu.cgpa}
                    </Typography>
                  )}
                  {edu.percentage && (
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Percentage:</strong> {edu.percentage}%
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Start Date:</strong> {edu.startDate}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>End Date:</strong> {edu.endDate}
                  </Typography>
                  {edu.certificate && (
                    <img
                      src={edu?.certificate?.File?.name}
                      alt="Certificate"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                  {edu.isPursuing && (
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      <strong>Pursuing:</strong> {edu.isPursuing ? "Yes" : "No"}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Experience Details */}
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Work Experience
            </Typography>
            {formData.experiences.map((exp, index) => (
              <Card key={index} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Company:</strong> {exp.company}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Job Title:</strong> {exp.jobTitle}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Responsibilities:</strong> {exp.keyResponsibilities}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Start Date:</strong> {exp.startDate}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>End Date:</strong> {exp.endDate}
                  </Typography>
                  <List>
                    <Typography variant="h6">Skills:</Typography>
                    {exp.skills.split(",").map((skill, skillIndex) => (
                      <ListItem key={skillIndex}>
                        <ListItemText primary={skill} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}

            {/* Skills Section */}
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Skills
            </Typography>
            <Typography variant="h6">Hard Skills</Typography>
            <List>
              {formData.hardSkills.map((skill, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${skill.skill} - ${skill.years} years`}
                  />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6">Soft Skills</Typography>
            <List>
              {formData.softSkills.map((skill, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${skill.skill} - ${skill.years} years`}
                  />
                </ListItem>
              ))}
            </List>

            {/* CV Display */}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              <strong>CV:</strong>{" "}
              {formData.cv ? formData.cv.name : "No file uploaded"}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Please complete your profile.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" color="primary" onClick={onEdit}>
                Edit
              </Button>
              <Button variant="contained" color="primary" onClick={onSubmit}>
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Preview;
