import React from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Grid,
  Button,
  Divider,
} from "@mui/material";

const ApplicantProfile = ({ data }) => {
  if (!data) {
    return (
      <Typography variant="h6" align="center">
        No data available
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        py: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 3,
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "white",
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={data.profilePicture}
              alt={`${data.firstName} ${data.lastName}`}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Typography variant="h4" fontWeight="bold">
              {data.firstName} {data.lastName}
            </Typography>
            <Typography variant="body1" mt={1}>
              Email: {data.email || "N/A"} | Phone: {data.phone || "N/A"}
            </Typography>
            <Typography>
              {data.location
                ? `${data.location.city}, ${data.location.state}, ${data.location.country}`
                : "Location: N/A"}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => alert("Contact requested")}
            >
              Contact Me
            </Button>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Professional Summary */}
            {data.profile_summery?.Professional_Detail && (
              <>
                <Typography variant="h6" color="primary" textAlign="center">
                  Professional Summary
                </Typography>
                <Typography variant="body2" mt={1}>
                  {data.profile_summery.Professional_Detail
                    .professionalSummary || "N/A"}
                </Typography>
                <Divider sx={{ my: 3 }} />
              </>
            )}

            {/* Skills */}
            {data.skills && (
              <>
                <Typography variant="h6" color="primary" textAlign="center">
                  Skills
                </Typography>
                <Typography variant="subtitle1" mt={1}>
                  Hard Skills:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  {data.skills.hardSkills?.map((skill) => (
                    <Chip
                      key={skill._id}
                      label={`${skill.skill} (${skill.years} years)`}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="subtitle1" mt={3}>
                  Soft Skills:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  {data.skills.softSkills?.map((skill) => (
                    <Chip
                      key={skill._id}
                      label={`${skill.skill} (${skill.years} years)`}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Divider sx={{ my: 3 }} />
              </>
            )}

            {/* Education */}
            {data.education && (
              <>
                <Typography variant="h6" color="primary" textAlign="center">
                  Education
                </Typography>
                {data.education.map((edu) => (
                  <Box key={edu._id} mt={2}>
                    <Typography>
                      <strong>{edu.level}:</strong> {edu.institution} (
                      {edu.degree || "N/A"}){" "}
                      {edu.specialization ? `in ${edu.specialization}` : ""}
                    </Typography>
                    <Typography>
                      CGPA: {edu.cgpa || "N/A"}, Grading: {edu.gradingSystem}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 3 }} />
              </>
            )}

            {/* Projects */}
            {data.project?.[0]?.Projects && (
              <>
                <Typography variant="h6" color="primary" textAlign="center">
                  Projects
                </Typography>
                <Typography mt={1}>
                  <strong>{data.project[0].Projects.projectTitle}:</strong>{" "}
                  {data.project[0].Projects.objective}
                </Typography>
                <Typography>
                  Tools: {data.project[0].Projects.toolsTechnologies}
                </Typography>
                <Typography>
                  Outcome: {data.project[0].Projects.outcome}
                </Typography>
                {data.project[0].Projects.url && (
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    href={data.project[0].Projects.url}
                    target="_blank"
                  >
                    View Project
                  </Button>
                )}
                <Divider sx={{ my: 3 }} />
              </>
            )}

            {/* Hobbies */}
            {data.hobbie?.Hobbies && (
              <>
                <Typography variant="h6" color="primary" textAlign="center">
                  Hobbies
                </Typography>
                <Typography>
                  <strong>Creative:</strong>{" "}
                  {data.hobbie.Hobbies.creativeHobbies || "N/A"}
                </Typography>
                <Typography>
                  <strong>Recreational:</strong>{" "}
                  {data.hobbie.Hobbies.recreationalActivities || "N/A"}
                </Typography>
                <Typography>
                  <strong>Fitness Activities:</strong>{" "}
                  {data.hobbie.Hobbies.sportsFitnessActivities?.join(", ") ||
                    "N/A"}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ApplicantProfile;
