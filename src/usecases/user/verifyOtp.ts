import { createUser } from "./createUser";
import { otpCache } from "./requestOtp";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/userRepository";

export const verifyOtp=async(email:string,enteredOtp:string,userData:Omit<User,"id">)=>{
    return async(userRepo:IUserRepository)=>{
        const cachedOtp = otpCache.get<string>(email);
        if (!cachedOtp || cachedOtp !== enteredOtp) {
            throw new Error("Invalid  OTP");
        }

        const user = await (await createUser(userData))(userRepo);
        otpCache.del(email);
        return user;
    }
}
