import { Request,Response } from "express";
import { createUser } from "../../usecases/user/createUser";
import { loginUser } from "../../usecases/user/loginUser";
import { UserRepoImpl } from "../../infrastructure/repositories/userRepoImpl";
import { generateAccessToken, generateRefreshToken } from "../../infrastructure/utils/jwt";


const userRepository = new UserRepoImpl();

export const registerUser = async(req:Request,res:Response)=>{
    try{
        const newUser = await(await createUser(req.body))(userRepository);
        res.status(201).json({message : "User created successfully", user:newUser})
    }catch(error:any){
        res.status(400).json({error:error.message})
    } 
}


export const loginUserController = async(req:Request,res:Response)=>{
    try{
        const {user} = await loginUser(req.body.email,req.body.password)(userRepository);

        
        const accessToken = generateAccessToken({ id: user.id, email: user.email });
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email });

        res.cookie("accessToken",accessToken,{
            httpOnly :true,
            secure:true,
            sameSite:true

        })
        .cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:true
        })
        .status(200).json({message:"Login Success",user})
    }catch(error:any){
        res.status(401).json({ error: error.message });
    }
}

export const requestOtp =async(req:Request,res:Response)=>{
    
}