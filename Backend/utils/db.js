import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({});
const connetDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DataBase Connected Successfully');

    } catch (error) {
        console.log('DataBase Connection Failed');
        console.log(error);
    }
}
export default connetDB;