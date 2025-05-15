import express from "express";



import { loginTechnicianController,requestOtpTechnicianController,verifyAndRegisterTechnician } from "../controllers/technicianController";



const router = express.Router();

router.post("/login", loginTechnicianController);
router.post("/request-otp", requestOtpTechnicianController);
router.post("/verify-otp", verifyAndRegisterTechnician);

export default router; 