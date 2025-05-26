import { Request, Response } from "express";
import { TechnicianRepoImpl } from "../../infrastructure/repositories/technicianRepoImpl";
import { generateAccessToken, generateRefreshToken } from "../../infrastructure/utils/jwt";
import { loginTechnician } from "../../usecases/technician/loginTechnician";
import { requestOtp } from "../../usecases/technician/requestOtp";
import { verifyOtp } from "../../usecases/technician/verifyOtp";

const technicianRepository = new TechnicianRepoImpl();

export const loginTechnicianController = async (req: Request, res: Response) => {
  try {
    const { technician } = await loginTechnician(req.body.email, req.body.password)(technicianRepository);

    const accessToken = generateAccessToken({ id: technician._id, email: technician.email });
    const refreshToken = generateRefreshToken({ id: technician._id, email: technician.email });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      })
      .status(200)
      .json({ message: "Login Success", technician });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const requestOtpTechnicianController = async (req: Request, res: Response) => {
  try {
    await requestOtp(req.body.email);
    res.status(200).json({ message: "OTP sent to technician email" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to send OTP" });
  }
};

export const verifyAndRegisterTechnician = async (req: Request, res: Response) => {
  try {
    const { email, otp, fullname, password, mobile } = req.body;

    const technician = await (
      await verifyOtp(email, otp, {
        fullname,
        email,
        password,
        mobile,
        isListed: false,
        isVerified: false,
        wallet: 0
      })
    )(technicianRepository);

    const accessToken = generateAccessToken({ id: technician._id, email: technician.email });
    const refreshToken = generateRefreshToken({ id: technician._id, email: technician.email });

    res
      .cookie("accessTokenTechnician", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      })
      .cookie("refreshTokenTechnician", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      })
      .status(201)
      .json({ message: "Technician registered", technician });
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Signup failed" });
  }
};
