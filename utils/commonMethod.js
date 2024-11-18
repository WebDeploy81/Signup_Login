
import nodemailer from "nodemailer";

export const validatePassword=(password)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

export const validateApplicantEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
  };

export const validateRecruiterMail= (email)=>{
    const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${process.env.CU_DOMAIN}$`);
    return emailRegex.test(email);
}

export const sendMail=async(user,token)=>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.CU_MAIL,
            pass: process.env.APP_PASS
        }
    });

    const mailOptions = {
        from: process.env.CU_MAIL,
        to: user.email,
        subject: 'Verify Your Email for Testing Platform',
        text: `Please verify your email by clicking the link: ${process.env.SERVER}/user/verify?token=${token}`
    };

    await transporter.sendMail(mailOptions);
}