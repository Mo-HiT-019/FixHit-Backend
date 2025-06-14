import { UserRepoImpl } from "../../infrastructure/repositories/userRepoImpl";

export const uploadProfilePic = async (userId: string, file: Express.Multer.File) => {
  const imageUrl = file.path; 

  const userRepo = new UserRepoImpl();
  return await userRepo.updateByUser(userId, { profilePic: imageUrl });
};