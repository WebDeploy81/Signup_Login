import express from 'express';
import cors from 'cors';
import passport from 'passport';
import userRoute from './router/user.route.js';
import socialAuthRoute from './router/social.auth.route.js';
import dotenv from 'dotenv'
import connetDB from './utils/db.js';
import session from 'express-session';
import { configureLinkedinPassport, configurePassport } from './middlewares/passportMiddleware.js';
dotenv.config({});
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOption={
    origin:"*",
    Credentials:true
};
app.use(cors(corsOption));
app.use(session({ secret: process.env.SERECT_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);
configureLinkedinPassport(passport);
const PORT=process.env.PORT || 8000;
app.use("/user",userRoute)
app.use("/auth",socialAuthRoute)
app.listen(PORT,()=>{
    connetDB();
    console.log(`server is running on port ${PORT}`);
});