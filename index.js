import express from 'express';
import cors from 'cors';
import userRoute from './router/user.route.js';
import dotenv from 'dotenv'
import connetDB from './utils/db.js';
dotenv.config({});
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOption={
    origin:"*",
    Credentials:true
};
app.use(cors(corsOption));
const PORT=process.env.PORT || 8000;
app.use("/user",userRoute)
app.listen(PORT,()=>{
    connetDB();
    console.log(`server is running on port ${PORT}`);
});