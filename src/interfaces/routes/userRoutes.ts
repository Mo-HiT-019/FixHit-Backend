import express from "express";

import { loginUserController,
    requestOtpController,
    verifyAndRegister,
    resetPasswordController,
    forgotPasswordVerifyOtpController,
    forgotPasswordRequestOtpController } from "../controllers/userController";



const router = express.Router();

router.post("/login", loginUserController);
router.post("/request-otp", requestOtpController);
router.post("/verify-otp", verifyAndRegister);
router.post("/request-reset-otp",forgotPasswordRequestOtpController);
router.post("/verify-reset-otp", forgotPasswordVerifyOtpController);
router.post("/reset-password", resetPasswordController);



export default router; 