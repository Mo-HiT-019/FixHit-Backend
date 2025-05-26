import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from "express";
import HTTP_statusCode from '../enum/statusCode';
import { CustomRequest } from '../types/custom-request';
import { UserRepoImpl } from '../infrastructure/repositories/userRepoImpl';


const userRepo = new UserRepoImpl()

export const verifyAccessToken =async(req:CustomRequest,res:Response,next:NextFunction)=>{
    const token = req.cookies.accessToken

    if(!token){
        return res.status(HTTP_statusCode.Unauthorized).json({message:"Access Token missing"});


    }

    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
        req.user = decoded;

        const user = await userRepo.findById(decoded.id)

        if (!user) {
        return res.status(HTTP_statusCode.Unauthorized).json({ message: "User not found" });
       }

       if (user.isBlocked) {
       res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
       });
       return res.status(HTTP_statusCode.NoAccess).json({ message: "Account is blocked" });
       }

       
        next();
    }catch(err){
        return res.status(HTTP_statusCode.Unauthorized).json({message:"Invalid or expired access token"})
    }
} 