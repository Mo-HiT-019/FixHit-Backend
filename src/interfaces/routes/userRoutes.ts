import express from "express";

import { loginUserController,requestOtpController,verifyAndRegister } from "../controllers/userController";



const router = express.Router();

router.post("/login", loginUserController);
router.post("/request-otp", requestOtpController);
router.post("/verify-otp", verifyAndRegister);

export default router; 