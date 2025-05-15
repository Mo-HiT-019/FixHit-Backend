import { Request,Response } from "express";
import { loginUser } from "../../usecases/user/loginUser";
import { UserRepoImpl } from "../../infrastructure/repositories/userRepoImpl";
import { generateAccessToken, generateRefreshToken } from "../../infrastructure/utils/jwt";
import { requestOtp } from "../../usecases/user/requestOtp";
import { verifyOtp } from "../../usecases/user/verifyOtp";


const userRepository = new UserRepoImpl();


export const loginUserController = async(req:Request,res:Response)=>{
    try{
        console.log("Login controller.........")
        const {user} = await loginUser(req.body.email,req.body.password)(userRepository);
        console.log("Login controller.........2")
        console.log("User from logincontoller",user)
        const accessToken = generateAccessToken({ id: user.id, email: user.email });
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email });

        res.cookie("accessToken",accessToken,{
            httpOnly :true,
            secure:true,
            sameSite:"strict"

        })
        .cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict"
        })
        .status(200).json({message:"Login Success",user})
    }catch(error:any){
        res.status(401).json({ error: error.message });
    }
}

export const requestOtpController =async(req:Request,res:Response)=>{
    try{
        console.log("Email req for otp ",req.body.email)
        await requestOtp(req.body.email);
        console.log("Check 1") 
        res.status(200).json({message:"OTP sent to email"})  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    }catch(err:any){
        res.status(500).json({message:err.message || "Failed to send otp"})
    }
}

export const verifyAndRegister = async(req:Request,res:Response)=>{
    try{
        const {email,otp,fullname,password,mobile}= req.body;

        console.log("Req",req.body)
        console.log("From verify controller",fullname)

        const user =await( await verifyOtp(email, otp, {
            fullname,
            password,
            mobile,
            email,
            wallet: 0,
            isBlocked: false
        }))(userRepository);


        const accessToken = generateAccessToken({ id: user.id, email: user.email });
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email });

        res
        .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        })
        .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        })
        .status(201)
        .json({ message: "User registered", user });
    }catch (error: any) {
        res.status(401).json({ message: error.message || "Signup failed" });
      }
}