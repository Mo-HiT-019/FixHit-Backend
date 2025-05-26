import { AdminModel } from "../models/adminModel";
import { IAdminRepository } from "../../domain/repositories/adminRepository";
import { Admin } from "../../domain/entities/admin";


export class AdminRepositoryImpl implements IAdminRepository {

  async createAdmin(admin: Admin): Promise<Admin> {
      return await AdminModel.create(admin);
  }

  async findByUsername(username: string): Promise<Admin | null> {
      return await AdminModel.findOne({username})
  }
}