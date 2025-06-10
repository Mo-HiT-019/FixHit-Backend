import { UserRepoImpl } from "../../infrastructure/repositories/userRepoImpl";
import { uploadImageToCloudinary } from "../../infrastructure/utils/cloudinary";

export const uploadProfilePic = async (userId: string, file: Express.Multer.File) => {
  const imageUrl = await uploadImageToCloudinary(file); 
  const userRepo = new UserRepoImpl();
  return await userRepo.updateByUser(userId, { profilePic: imageUrl });
};