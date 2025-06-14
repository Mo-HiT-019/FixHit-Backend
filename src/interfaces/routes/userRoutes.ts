import express from "express";

import { loginUserController,
    requestOtpController,
    verifyAndRegister,
    resetPasswordController,
    forgotPasswordVerifyOtpController,
    forgotPasswordRequestOtpController, 
    uploadProfilePicController,
    logoutUserController} from "../controllers/userController";
import multer from "multer";
import { verifyAccessToken } from "../../middlewares/verifyToken";
import { uploadUserProfilePic } from "../../infrastructure/utils/cloudinaryStorage";



const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", loginUserController);
router.post("/logout",logoutUserController)
router.post("/request-otp", requestOtpController);
router.post("/verify-otp", verifyAndRegister);
router.post("/request-reset-otp",forgotPasswordRequestOtpController);
router.post("/verify-reset-otp", forgotPasswordVerifyOtpController);
router.post("/reset-password", resetPasswordController);
router.post('/upload-profile-pic', verifyAccessToken, uploadUserProfilePic.single('profilePic'), uploadProfilePicController);




export default router; 