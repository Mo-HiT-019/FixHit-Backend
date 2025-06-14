import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "./cloudinary";


const userProfilePicStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "user_profiles", 
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "technician_profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});

const certificateStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "technician_certificates",
    allowed_formats: ["pdf"],
    resource_type: "raw",
  }),
});

const technicianVerificationIdStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "technician_verification_ids", 
    allowed_formats: ["jpg", "jpeg", "png", "pdf"], 
    resource_type: "auto", 
  }),
});

export const upload = multer({ storage });
export const uploadCertificates = multer({ storage: certificateStorage });
export const uploadUserProfilePic = multer({ storage: userProfilePicStorage });
export const uploadVerificationIds = multer({ storage: technicianVerificationIdStorage });


export const uploadTechnicianProfileFiles = multer({
  storage: new CloudinaryStorage({ 
    cloudinary,
    params: async (req, file) => {
      
      if (file.fieldname === 'profilePic') {
        return {
          folder: "technician_profiles",
          allowed_formats: ["jpg", "jpeg", "png"],
        };
      } else if (file.fieldname === 'documents') {
        return {
          folder: "technician_certificates",
          allowed_formats: ["pdf", "jpg", "jpeg", "png"], 
          resource_type: "auto",
        };
      } else if (file.fieldname === 'verificationId') {
        return {
          folder: "technician_verification_ids",
          allowed_formats: ["jpg", "jpeg", "png", "pdf"],
          resource_type: "auto",
        };
      }
      return {};
    },
  }),
});