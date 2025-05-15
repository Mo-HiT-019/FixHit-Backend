import { Technician } from "../../domain/entities/technicain";
import { ITechnicianRepository } from "../../domain/repositories/technicianRepository";
import bcrypt from "bcrypt";

export const createTechnician = async (
  technicianData: Omit<Technician, "id">
) => {
  return async (technicianRepo: ITechnicianRepository) => {
    const existingTechnician = await technicianRepo.findByEmail(
      technicianData.email
    );
    if (existingTechnician) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(technicianData.password, 10);

    const newTechnician: Technician = {
      ...technicianData,
      password: hashedPassword,
      wallet: 0,
      isListed: false,
      isVerified: false,
      profileCompleted: false,
    };

    return await technicianRepo.createTechnician(newTechnician);
  };
};
