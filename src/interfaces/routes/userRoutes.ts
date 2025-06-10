import express from "express";

import { loginUserController,
    requestOtpController,
    verifyAndRegister,
    resetPasswordController,
    forgotPasswordVerifyOtpController,
    forgotPasswordRequestOtpController, 
    uploadProfilePicController} from "../controllers/userController";
import multer from "multer";
import { verifyAccessToken } from "../../middlewares/verifyToken";


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", loginUserController);
router.post("/request-otp", requestOtpController);
router.post("/verify-otp", verifyAndRegister);
router.post("/request-reset-otp",forgotPasswordRequestOtpController);
router.post("/verify-reset-otp", forgotPasswordVerifyOtpController);
router.post("/reset-password", resetPasswordController);
router.post('/upload-profile-pic', verifyAccessToken, upload.single('profilePic'), uploadProfilePicController);




export default router; 