
import { IAdminRepository } from "../../domain/repositories/adminRepository";
import { Admin } from "../../domain/entities/admin";
import bcrypt from 'bcrypt';

export const loginAdmin = (username: string, password: string) => {
    return async (adminRepo: IAdminRepository): Promise<Admin> => {
        const admin = await adminRepo.findByUsername(username);

        if (!admin) {
            throw new Error("Invalid credentials.");
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
        }
        return admin;
    };
};