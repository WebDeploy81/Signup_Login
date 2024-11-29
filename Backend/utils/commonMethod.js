
import nodemailer from "nodemailer";
import  Twilio from "twilio";
export const validatePassword=(password)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/;
    return passwordRegex.test(password);
}

export const validateApplicantEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
  };

export const validateRecruiterMail= (email)=>{
    const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${process.env.CU_DOMAIN}$`);
    return emailRegex.test(email);
}

export const generate6Otp=(length)=>{
    if (length <= 0) {
        throw new Error("OTP length must be greater than 0.");
    }

    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }
    return otp;
}
export const isValidMobileNumber=(mobileNumber)=>{
    const regex = /^[0-9]{10}$/;
    return regex.test(mobileNumber);
}
export const sendSMS=async(otp,mobile)=>{
    try {
        const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        const response=await client.messages
        .create({
            body: `OTP for Account login is ${otp} and it is valid for 5 minutes`,
            from: process.env.PHONE_FOR_TWILIO,
            to: `+91${mobile}`
        });
        // const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        //   method: 'POST',
        //   headers: {
        //     Authorization: process.env.FAST_SMS,
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //   },
        //   body: new URLSearchParams({
        //     variables_values:otp,
        //     route: 'otp',
        //     numbers:mobile
        //   }),
        // });
        return response;
      } catch (error) {
            return error.message
    }
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
        to: user.contact,
        subject: 'Verify Your Email for Testing Platform',
        text: `Please verify your email by clicking the link: ${process.env.SERVER}/user/verify?token=${token}`
    };

    await transporter.sendMail(mailOptions);
}