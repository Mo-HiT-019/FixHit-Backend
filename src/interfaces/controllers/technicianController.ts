import { Request, Response } from "express";
import { TechnicianRepoImpl } from "../../infrastructure/repositories/technicianRepoImpl";
import { generateAccessToken, generateRefreshToken } from "../../infrastructure/utils/jwt";
import { loginTechnician } from "../../usecases/technician/loginTechnician";
import { requestOtp } from "../../usecases/technician/requestOtp";
import { verifyOtp } from "../../usecases/technician/verifyOtp";
import { updateTechnicianProfile } from "../../usecases/technician/updateTechnicianProfile";
import { getTechniciansForVerification } from "../../usecases/technician/getTechniciansForVerification";
import { markTechnicianAsVerified } from "../../usecases/technician/markTechnicianAsVerified";
import { Technician } from "../../domain/entities/technicain";
import HTTP_statusCode from "../../enum/statusCode";
import { completeTechnicianProfile } from "../../usecases/technician/completeTechnicianProfile";

const technicianRepository = new TechnicianRepoImpl();

export const loginTechnicianController = async (req: Request, res: Response) => {
  try {
    const { technician } = await loginTechnician(req.body.email, req.body.password)(technicianRepository);

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
      .status(200)
      .json({ message: "Login Success", technician });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const logoutTechnicianController = (req: Request, res: Response) => {
  res.clearCookie("accessTokenTechnician", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshTokenTechnician", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(HTTP_statusCode.OK).json({ message: "Logged out successfully" });
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


export const updateTechnicianProfileController = async (req: Request, res: Response) => {
  try {

    console.log("Profile completion called")
    const technicianId = req.params.id;
    if (!technicianId) return res.status(401).json({ message: 'Unauthorized' });

    const {
      gender, dob, experience, certification,
      services, ['address[residential]']: residential,
      ['address[city]']: city, ['address[district]']: district,
      ['address[state]']: state, ['address[pincode]']: pincode,
    } = req.body;

    const profilePicUrl = (req.file as any)?.path;
    const certificateUrls = (req.files as { [fieldname: string]: Express.Multer.File[] })?.documents?.map((file) => file.path) || [];

    const updates = {
      gender,
      dob,
      experience,
      certification,
      profilePic: profilePicUrl,
      certificates: certificateUrls,
      services: Array.isArray(services) ? services : [services],
      address: {
        residential,
        city,
        district,
        state,
        pincode,
      },
    };

    const updatedTechnician = await updateTechnicianProfile(technicianId, updates);
    res.status(HTTP_statusCode.OK).json({ message: 'Profile updated', technician: updatedTechnician });
  } catch (err: any) {
    console.error('Error updating profile:', err);
    res.status(HTTP_statusCode.InternalServerError).json({ message: 'Something went wrong. Please try again.' });
  }
};


export const completeTechnicianProfileController = async(req:Request,res:Response)=>{
  try{
    const technicianId= req.params.id;

    if(!technicianId){
      return res.status(HTTP_statusCode.Unauthorized).json({success:false,message:"Technician ID not found"})
    }

    const files =req.files as{
      profilePic?:Express.Multer.File[];
      documents?:Express.Multer.File[];
      verificationId?:Express.Multer.File[];
    }

    const profilePicFile = files?.profilePic ? files.profilePic[0]:undefined;
    const documentFiles = files?.documents;
    const verificationIdFiles = files?.verificationId;

    if (!profilePicFile) {
        return res.status(HTTP_statusCode.BadRequest).json({ success: false, message: 'Profile picture is required.' });
    }

    if (!verificationIdFiles || verificationIdFiles.length === 0) {
        return res.status(HTTP_statusCode.BadRequest).json({ success: false, message: 'At least one verification ID document is required.' });
    }

    const formData: Partial<Technician> = req.body;

    const updatedTechnician = await completeTechnicianProfile(
      technicianId,
      profilePicFile,
      documentFiles,
      verificationIdFiles,
      formData
    );

    if (!updatedTechnician) {
      return res.status(HTTP_statusCode.NotFound).json({ success: false, message: 'Technician not found or profile update failed.' });
    }

    res.status(HTTP_statusCode.OK).json({ success: true, message: 'Technician profile completed successfully.', technician: updatedTechnician });


    
  } catch (error: any) {
    console.error('Error in completeTechnicianProfileController:', error);
    res.status(HTTP_statusCode.InternalServerError).json({ success: false, message: error.message || 'Failed to complete technician profile.' });
  }
}