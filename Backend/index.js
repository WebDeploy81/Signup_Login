import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import mammoth from 'mammoth';
import fs from 'fs';
import {JDData} from './modals/JDModel.js';
import passport from 'passport';
import userRoute from './router/user.route.js';
import socialAuthRoute from './router/social.auth.route.js';
import adminRoute from './router/admin.route.js';
import dotenv from 'dotenv'
import connetDB from './utils/db.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { configureLinkedinPassport, configurePassport } from './middlewares/passportMiddleware.js';
import profileRoutes from './router/profileRoutes.js';
// const profileRoutes = require('./routes/profileRoutes');
import personalRoutes from './router/personalRoutes.js';
// const personalRoutes = require('./routes/personalRoutes');
import skillsRoutes from './router/skillsRoutes.js';
// const skillsRoutes = require('./routes/skillsRoutes');
import educationRoutes from './router/educationRoutes.js';
// const educationRoutes = require('./routes/educationRoutes');
import experienceRoutes from './router/experienceRoutes.js';
// const experienceRoutes = require('./routes/experienceRoutes');
import file from './router/fileRoutes.js';
// const file = require('./routes/fileRoutes');
import certificates from './router/certificateRoutes.js';
// const certificates = require('./routes/certificateRoutes');
import activity from './router/activityRoutes.js';
// const activity = require('./routes/activityRoutes');
import achievement from './router/achievementRoutes.js';
// const achievement = require('./routes/achievementRoutes');
import project from './router/projectRoutes.js';
// const project = require('./routes/projectRoutes');
import research_publication from './router/research&publicationRoutes.js';
// const research_publication = require('./routes/research&publicationRoutes');
import conferences_seminars from './router/conferences&seminars.js';
// const conferences_seminars = require('./routes/conferences&seminars');
import domain_intreast from './router/domain_intrestRoutes.js';
// const domain_intreast = require('./routes/domain_intrestRoutes');
import experties_area from './router/expertise_areaRoutes.js';
// const experties_area = require('./routes/expertise_areaRoutes');
import language from './router/languageRoutes.js';
// const language = require('./routes/languageRoutes');
import patent from './router/pantentsRoutes.js';
// const patent = require('./routes/pantentsRoutes');
import profile_summery from './router/profile_summery.js';
// const profile_summery = require('./routes/profile_summery');
import hobbieRoutes from './router/hobbieRoutes.js';
// const hobbieRoutes = require('./routes/hobbieRoutes');
import referenceRouter from './router/referenceRouter.js';
// const referenceRouter = require('./routes/referenceRouter');

// const check_login = require('./middlewares/check-login');
dotenv.config({});
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const allowedOrigins = [
    process.env.CALLBACK_URL,
  ];
const corsOption = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };
// const corsOption={
//     origin:"*",
//     Credentials:true
// };
app.use(cors(corsOption));
app.use(cookieParser());
app.use(session({ secret: process.env.SERECT_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);
configureLinkedinPassport(passport);
app.use("/user",userRoute)
app.use("/auth",socialAuthRoute)
app.use("/admin",adminRoute)
// Applicant API server.js route
app.use('/profile', profileRoutes);
app.use('/personal', personalRoutes)
app.use('/skills', skillsRoutes);
app.use('/education', educationRoutes);
app.use('/experience', experienceRoutes);
app.use('/file', file);
app.use('/certificate', certificates);
app.use('/activity', activity);
app.use('/achievement', achievement);
app.use('/project', project);
app.use('/research_publication', research_publication);
app.use('/conferences_seminars', conferences_seminars);
app.use('/domain_intrest', domain_intreast);
app.use('/experties_area', experties_area);
app.use('/language', language);
app.use('/patent', patent);
app.use('/profile_summery', profile_summery);
app.use('/hobbie', hobbieRoutes);
app.use('/reference', referenceRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: "uploads/" });
const parseDocx = async (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  } catch (error) {
    console.error("Error parsing .docx file:", error.message);
    throw new Error("Error parsing .docx file");
  }
};
const extractJDParameters = (content) => {
  const getValue = (label) => {
    const regex = new RegExp(`${label}\\s*[:\\-]\\s*(.+?)\\s*(\\n|$)`, "i");
    return content.match(regex)?.[1]?.trim() || null;
  };
const getList = (label) => {
  const regex = new RegExp(`${label}\\s*[:\\-]\\s*(.*?)(\\n\\n|$)`, "is");
  const match = content.match(regex);
  return match
    ? match[1]
        .split(/\n|\●|\-/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
  };
  return {
    jobTitle: getValue("JOB TITLE"),
    noOfVacancies: getValue("NO OF VACANCIES"),
    collegeCategory: getValue("COLLEGE CATEGORY"),
    aboutCompany: getValue("ABOUT THE COMPANY"),
    companyName: getValue("COMPANY NAME"),
    jobLocation: getValue("JOB LOCATION"),
    availability: getValue("AVAILABILITY"),
    salaryRange: getValue("SALARY RANGE"),
    salaryType: getValue("SALARY TYPE"),
    essentialQualification: getValue("ESSENTIAL QUALIFICATION"),
    hardSkills: getList("HARD SKILLS"),
    softSkills: getList("SOFT SKILLS"),
    domain: getValue("DOMAIN"),
    workMode: getValue("WORK MODE"),
    modeOfEmployment: getValue("MODE OF EMPLOYMENT"),
    rolesAndResponsibilities: getList("ROLES AND RESPONSIBILITIES"),
    perksAndBenefits: getList("PERKS AND BENEFITS"),
    levelOfRole: getValue("LEVEL OF ROLE"),
    preferredQualification: getValue("PREFERRED/DESIRED QUALIFICATION"),
    salaryCurrency: getValue("SALARY_CURRENCIES"),
    overallExperience: getValue("OVERALL EXPERIENCE"),
    relevantExperience: getValue("RELEVANT EXPERIENCE"),
    jobDescriptionSummary: getValue("JOB DESCRIPTION SUMMARY"),
    experienceSkills: getList("EXPERIENCE_SKILLS"),
    preferredSkills: getList("PREFERRED SKILLS"),
  };
}
app.post("/upload-jd-manual", async (req, res) => {
  try {
    console.log("Received payload:", JSON.stringify(req.body, null, 2));
    const jdData = new JDData(req.body);
    await jdData.save();
    res.status(201).json({ success: true, data: jdData });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Validation Error:", error.errors);
      res
        .status(400)
        .json({ success: false, error: error.message, details: error.errors });
    } else {
      console.error("Upload Error:", error.message);
      res
        .status(500)
        .json({ success: false, error: "Failed to upload JD manually." });
    }
  }
});
app.post("/upload-jd-auto", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded." });
    }
    console.log("File received:", req.file);
    const content = await parseDocx(req.file.path);
    const extractedData = extractJDParameters(content);
    console.log("Extracted JD Data:", extractedData);
    const jdData = new JDData(extractedData);
    await jdData.save();
    fs.unlinkSync(req.file.path); // Clean up the uploaded file
    res.status(201).json({ success: true, data: jdData });
  } catch (error) {
    console.error("Automatic Upload Error:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to upload JD automatically." });
  }
});
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    connetDB();
    console.log(`server is running on port ${PORT}`);
});