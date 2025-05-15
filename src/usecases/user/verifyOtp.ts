import { createUser } from "./createUser";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/userRepository";
import { OtpModel } from "../../infrastructure/models/otpModel";


export const verifyOtp=async(email:string,enteredOtp:string,userData:Omit<User,"id">)=>{
    console.log(userData)
    return async(userRepo:IUserRepository)=>{
       
        const otpDoc = await OtpModel.findOne({ email });

        if(!otpDoc){
            throw new Error("OTP expired or invalid");
        }

        if(otpDoc.otp!==enteredOtp){
            throw new Error ("Invalid Otp")
        }

        const user = await (await createUser(userData))(userRepo);
        await OtpModel.deleteOne({ email });
        return user;
    }
}
