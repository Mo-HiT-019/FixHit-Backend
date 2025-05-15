import { generateOTP } from "../../infrastructure/utils/otp";
import { sendOtpEmail } from "../../interfaces/services/emailService";
import NodeCache from 'node-cache';
import { OtpModel } from "../../infrastructure/models/otpModel";

const otpCache = new NodeCache({stdTTL:300});

export const requestOtp = async (email:string)=>{
    const otp = generateOTP();
    
    await OtpModel.deleteMany({email});
    await OtpModel.create({ email, otp });

    otpCache.set(email,otp);
    await sendOtpEmail (email,otp);
    console.log("Otp sent")
};