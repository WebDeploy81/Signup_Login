import express from 'express';
import cors from 'cors';
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
import isAuthenticated from './middlewares/isAuthenticated.js';
// const referenceRouter = require('./routes/referenceRouter');

// const check_login = require('./middlewares/check-login');
dotenv.config({});
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
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
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    connetDB();
    console.log(`server is running on port ${PORT}`);
});