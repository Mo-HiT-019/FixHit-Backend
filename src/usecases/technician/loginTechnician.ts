import { ITechnicianRepository } from "../../domain/repositories/technicianRepository";
import { Technician } from "../../domain/entities/technicain";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fixHitJWTSecret";

export const loginTechnician = (email: string, password: string) => {
  return async (
    technicianRepo: ITechnicianRepository
  ): Promise<{ token: string; technician: Technician }> => {
    const technician = await technicianRepo.findByEmail(email);
    if (!technician) throw new Error("Technician not found");

    const isPassValid = await bcrypt.compare(password, technician.password);
    if (!isPassValid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: technician._id, email: technician.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return { token, technician };
  };
};
