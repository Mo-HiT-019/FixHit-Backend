import { generateOTP } from "../../infrastructure/utils/otp";
import { sendOtpEmail } from "../../interfaces/services/emailService";
import NodeCache from 'node-cache';

const otpCache = new NodeCache({stdTTL:300});

export const requestOtp = async (email:string)=>{
    const otp = generateOTP();
    otpCache.set(email,otp);
    await sendOtpEmail (email,otp);
};

export {otpCache};