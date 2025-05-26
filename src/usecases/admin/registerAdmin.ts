import { IAdminRepository } from "../../domain/repositories/adminRepository";
import { Admin } from "../../domain/entities/admin";
import bcrypt from 'bcrypt';

export const registerAdmin =(admin:Admin)=>{
    return async (adminRepo:IAdminRepository)=>{
        const existing = await adminRepo.findByUsername(admin.username);
        if(existing) throw new Error("Admin username exists..");

        const hashedPassword = await bcrypt.hash(admin.password,10);

        return await adminRepo.createAdmin({...admin,password:hashedPassword});
    }
}