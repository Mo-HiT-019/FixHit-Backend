import express from "express";
import { loginTechnicianController,requestOtpTechnicianController,updateTechnicianProfileController,verifyAndRegisterTechnician } from "../controllers/technicianController";
import { uploadCertificates,upload } from "../../infrastructure/utils/cloudinaryStorage";
import multer from "multer";




const router = express.Router();

router.post("/login", loginTechnicianController);
router.post("/request-otp", requestOtpTechnicianController);
router.post("/verify-otp", verifyAndRegisterTechnician);
router.patch('/profile/:id',multer().any(),updateTechnicianProfileController);

export default router; 