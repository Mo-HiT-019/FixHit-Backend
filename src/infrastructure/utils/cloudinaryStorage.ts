import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "./cloudinary";

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

export const upload = multer({ storage });
export const uploadCertificates = multer({ storage: certificateStorage });
