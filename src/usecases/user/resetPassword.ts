import bcrypt from "bcrypt";
import { IUserRepository } from "../../domain/repositories/userRepository";

export const resetPassword = (email: string | undefined, password: string) => {
  return async (userRepo: IUserRepository) => {
    if (!email) throw new Error("Email is required");

    console.log("From reset password use case");

    const user = await userRepo.findByEmail(email);
    console.log(user)
    if (!user) throw new Error("User not found");
    if (!user._id) { 
        throw new Error("User ID is missing.");
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepo.updateByUser(user._id, { password: hashedPassword });
  };
};