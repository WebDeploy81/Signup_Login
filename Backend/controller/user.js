import {User} from "../modals/user.models.js";
import { sendMail, validatePassword, validateRecruiterMail, validateApplicantEmail } from "../utils/commonMethod.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const register=async(req,resp)=>{
    const {name ,email,password,role}=req.body;
    if(!name || !email || !password || !role){
        return resp.status(400).json({
            message:"Mandatory feild can not be empty",
            success:false
        })
    }
    if(role==1){
        //this role for Admin
        if(!validateApplicantEmail(email)){
            return resp.status(400).json({
                message:"Invalid Email!",
                status:400,
                success:false
            })
        }
    }else if(role==2){
        //this role for recruiter
        if(!validateRecruiterMail(email)){
            return resp.status(400).json({
                message:`Invalid email! Please use a ${process.env.CU_DOMAIN} domain.`,
                status:400,
                success:false
            })
        }

    }else if(role==3){
        if(!validateApplicantEmail(email)){
            return resp.status(400).json({
                message:"Invalid Email!",
                status:400,
                success:false
            })
        }
        
    }else{
        return resp.status(400).json({
            message:"Role does not exsist",
            success:false
        });
    }
    try {
        const usr=await User.findOne({contact:email});
        if(usr){
            return resp.status(400).json({
                message:"User Already exsist with this email",
                status:400,
                success:false
            });
        }
    } catch (error) {
        return resp.status(500).json({
            message:`Internal server Error${error}`,
            status:500,
            success:false
        });
    }
    const isValidpass=validatePassword(password);
        if(!isValidpass){
            return resp.status(400).json({
                message:"Please enter valid password!",
                success:false
            });
        }
        const hashpassword=await bcrypt.hash(password,10);
        const user=new User({
            name ,
            contact:email,
            password:hashpassword,
            role,
        });
        const token=jwt.sign({userId:user._id},process.env.SERECT_KEY,{expiresIn:'1d'});
        //save user here
        try {
            await sendMail(user,token);
            user.save();
            return resp.status(200).json({
                message:`Verification link has been sent to ${email}`,
                status:200,
                success:true
            });
        } catch (error) {
            return resp.status(500).json({
                message:`Internal server Error${error}`,
                status:500,
                success:false
            });
        }
    
}
export const verifytoken=async(req,resp)=>{
    const token=req.query.token;
    try {
        const decode=jwt.verify(token,process.env.SERECT_KEY);
        let user=await User.findOne({ _id: decode.userId });
        if(!user){
          return  resp.send(`
                <html>
                    <head>
                        <title>Verification Failed</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                            .error { color: red; font-size: 24px; }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h1>Verification Failed</h1>
                            <p>Invalid token, there was an error verifying your account. Please try again.</p>
                        </div>
                    </body>
                </html>
            `);
        }
        if(user.isAccVarified){
           return resp.send(`
                <html>
                    <head>
                        <title>Verification Success</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                            .success { color: green; font-size: 24px; }
                        </style>
                    </head>
                    <body>
                        <div class="success">
                            <h1>Account is already Verified!</h1>
                        </div>
                    </body>
                </html>
            `);
        }
        user.isAccVarified=true;
        await user.save();
        return resp.send(`
            <html>
                <head>
                    <title>Verification Success</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                        .success { color: green; font-size: 24px; }
                    </style>
                </head>
                <body>
                    <div class="success">
                        <h1>Account Verified Successfully!</h1>
                        <p>Thank you for verifying your account. You can now log in.</p>
                    </div>
                </body>
            </html>
        `);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return resp.send(`
                <html>
                    <head>
                        <title>Token Expired</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                            .error { color: red; font-size: 24px; }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h1>Token Expired</h1>
                            <p>Your token has been expired please generate new token!</p>
                        </div>
                    </body>
                </html>
            `);
        } else {
           return resp.send(`
                <html>
                    <head>
                        <title>Verification Failed</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                            .error { color: red; font-size: 24px; }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h1>Verification Failed</h1>
                            <p>Invalid token, there was an error verifying your account. Please try again.</p>
                        </div>
                    </body>
                </html>
            `);
        }   
    }
}

export const loginUser=async(req,resp)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return resp.status(400).json({
            message:"Feild can not be empty",
            status:400,
            success:false
        });
    }
    try {
        const user=await User.findOne({contact:email}).lean();
        if(!user){
            return resp.status(400).json({
                message:"Account does not exsist",
                status:400,
                success:false
            });
        }else if(!user.isAccVarified){
            return resp.status(401).json({
                message:"Please Verify Your Account",
                status:401,
                success:false
            });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return resp.status(400).json({
                message:"Invalid Username or Password",
                status:400,
                success:false
            })
        }
        const token=await jwt.sign({userId:user._id,userRole:user.role},process.env.SERECT_KEY,{expiresIn:'1d'});
        const {_id,name,role}=user;
        
        return resp.status(200).json({
            message:`Welcome ${name}`,
            _id,
            name,
            role,
            email,
            token:token,
            status:200,
            success:true
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return resp.status(500).json({
            message:"Server Error",
            error,
            success:false
        });
    }

}
export const logout=(req,resp)=>{
    if(req.cookies.token){
        return resp.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    }
    return resp.status(200).json({
        message:'Logged out successfully',
        status:200,
        success:true
    });
}
