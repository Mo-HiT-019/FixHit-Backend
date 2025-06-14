import express from "express";
import { completeTechnicianProfileController, loginTechnicianController,logoutTechnicianController,requestOtpTechnicianController,updateTechnicianProfileController,verifyAndRegisterTechnician } from "../controllers/technicianController";
import { uploadCertificates,upload, uploadTechnicianProfileFiles } from "../../infrastructure/utils/cloudinaryStorage";
import multer from "multer";




const router = express.Router();

router.post("/login", loginTechnicianController);
router.post("/logout",logoutTechnicianController)
router.post("/request-otp", requestOtpTechnicianController);
router.post("/verify-otp", verifyAndRegisterTechnician);
router.patch('/profile/:id',uploadTechnicianProfileFiles.fields([
    {name:'profilePic',maxCount:1},
    {name:'documents',maxCount:5},
    {name:'verificationId',maxCount:2}
]),completeTechnicianProfileController);


export default router; 