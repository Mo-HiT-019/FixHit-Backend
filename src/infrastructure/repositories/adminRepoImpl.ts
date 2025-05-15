import { AdminModel } from "../models/adminModel";
import { IAdminRepository } from "../../domain/repositories/adminRepository";


export const adminRepositoryImpl = (): IAdminRepository => ({
  async findByUsername(username) {
    const admin = await AdminModel.findOne({ username });
    return admin ? {
      id: admin._id.toString(),
      username: admin.username,
      password: admin.password,
    } : null;
  }
});