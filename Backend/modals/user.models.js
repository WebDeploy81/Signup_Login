import mongoose from "mongoose";
const userSchemma=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:[1,2,3],//1-Admin, 2-Recruiter, 3-Applicant
        required:true
    },
    isAccVarified:{
        type:Boolean,
        default:false
    },
},{timestamps:true});
export const User=mongoose.model('User',userSchemma);
