import mongoose from "mongoose"

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