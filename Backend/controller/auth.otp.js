import { User } from "../modals/user.models.js";
import jwt from "jsonwebtoken";
import { generate6Otp, isValidMobileNumber, sendSMS } from "../utils/commonMethod.js"
const otpStore = new Map();
export const sendOtp=async(req,resp)=>{
    const {mobile}=req.body;
    if(!mobile){
        return resp.status(400).json({
            message:"Mobile number cannot be empty",
            status:400,
            success:false
        });
    }else if(!isValidMobileNumber(mobile)){
        return resp.status(400).json({
            message:"Invalid mobile number",
            status:400,
            success:false
        });
    }
    const otp=generate6Otp(6);
    const data=await sendSMS(otp,mobile);
    if(data.sid){
        const timestamp = Date.now();
        otpStore.set(mobile, {otp, timestamp });
        return resp.status(200).json({
            message:"An otp has been sent to your mobile number",
            status:200,
            success:true
        });
    }
    // const timestamp = Date.now();
    // otpStore.set(mobile, { otp, timestamp });
    return resp.status(400).json({
        message:"Failed to send otp",
        data,
        status:400,
        success:false
    });
}
export const verifyOtp=async(req,resp)=>{
    const {otp,mobile}=req.body;
    const otpData = otpStore.get(mobile);
    const currentTime = Date.now();
    // console.log(otpData);
    if (otp === otpData.otp && (currentTime - otpData.timestamp) <= 300000) {
        try {
            const user=await User.findOne({contact:mobile}).lean();
            if(!user){
                const newuser=new User({
                    name:"Unknown",
                    contact:mobile,
                    role:3,
                    isAccVarified:true
                });
                otpStore.delete(mobile);
                const token=jwt.sign({userId:newuser._id,userRole:newuser.role},process.env.SERECT_KEY,{expiresIn:'1d'});
                newuser.save();
                return resp.status(200).json({
                    mobile:newuser.contact,
                    role:3,
                    token:token
                });
            }else{
                otpStore.delete(mobile);
                const token=jwt.sign({userId:user._id,userRole:user.role},process.env.SERECT_KEY,{expiresIn:'1d'});
                return resp.status(200).json({
                    mobile:user.contact,
                    role:user.role,
                    token:token
                });
            }
        } catch (error) {
            console.error(error);
            return resp.status(500).json({
                message:"Server Error",
                error
            })
        }
    }
    return resp.status(400).json({
        message:"Invalid/Expired otp",
        status:400,
        success:false
    });
    
}