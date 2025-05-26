import { Request,Response } from "express";
import { loginUser } from "../../usecases/user/loginUser";
import { UserRepoImpl } from "../../infrastructure/repositories/userRepoImpl";
import { generateAccessToken, generateRefreshToken } from "../../infrastructure/utils/jwt";
import { requestOtp } from "../../usecases/user/requestOtp";
import { verifyOtp } from "../../usecases/user/verifyOtp";
import HTTP_statusCode from "../../enum/statusCode";
import jwt, { JwtPayload } from "jsonwebtoken";
import { OtpModel } from "../../infrastructure/models/otpModel";
import { resetPassword } from "../../usecases/user/resetPassword";




const userRepository = new UserRepoImpl();


export const loginUserController = async(req:Request,res:Response)=>{
    try{
        const {user} = await loginUser(req.body.email,req.body.password)(userRepository);

        if (user.isBlocked) {
         return res
        .status(HTTP_statusCode.NoAccess)
        .json({ message: "Your account has been blocked..." });
        }


        console.log("User from logincontoller",user)
        const accessToken = generateAccessToken({ id: user._id, email: user.email });
        const refreshToken = generateRefreshToken({ id: user._id, email: user.email });

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
        res.status(401).json({message:"Login failed", error: error.message });
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


        const accessToken = generateAccessToken({ id: user._id, email: user.email });
        const refreshToken = generateRefreshToken({ id: user._id, email: user.email });

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


export const logoutUserController = (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(HTTP_statusCode.OK).json({ message: "Logged out successfully" });
};

export const forgotPasswordRequestOtpController = async (req:Request, res:Response) => {
  const { email } = req.body;
  try {
    await requestOtp(email);
    res.status(HTTP_statusCode.OK).json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "Failed to send OTP" });
  }
};


export const forgotPasswordVerifyOtpController = async (req:Request, res:Response) => {
  const { email, otp } = req.body;
  try {
    const otpDoc = await OtpModel.findOne({ email });
    if (!otpDoc || otpDoc.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(HTTP_statusCode.OK).json({ message: "OTP verified" }); 
  } catch {
    res.status(HTTP_statusCode.InternalServerError).json({ message: "OTP verification failed" });
  }
};


export const resetPasswordController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(`Email trying to reset:${email}`)

  if (!email || !password) {
    return res.status(HTTP_statusCode.BadRequest).json({ message: "Email and password are required" });
  }

  try {
    console.log("Before resetPass")
    await resetPassword(email, password)(userRepository);
    res.status(HTTP_statusCode.OK).json({ message: "Password reset successfully" });
  } catch (error: any) {
    console.error("Reset Password Error:", error);
    res.status(HTTP_statusCode.InternalServerError).json({ message: error.message || "Failed to reset password" });
  }
};



export const handleRefreshToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload;

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, 
    });

    return res.status(HTTP_statusCode.OK).json({ message: "Access token refreshed" });
  } catch (err) {
    return res.status(HTTP_statusCode.NoAccess).json({ message: "Invalid refresh token" });
  }
};
