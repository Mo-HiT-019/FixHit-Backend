import { Technician } from "../../domain/entities/technicain";
import { ITechnicianRepository } from "../../domain/repositories/technicianRepository";
import {TechnicianModel} from "../models/technicianModel";

export class TechnicianRepoImpl implements ITechnicianRepository {
  
  async createTechnician(technician: Technician): Promise<Technician> {
    const newTech = new TechnicianModel(technician);
    const saved = await newTech.save();
    const { _id, ...rest } = saved.toObject();
    return { id: _id.toString(), ...rest };
  }

  async findAllTechnicians(search?: string): Promise<Technician[]> {
    const query = search ? { fullname: { $regex: search, $options: "i" } } : {};
    return await TechnicianModel.find(query).select("-password");
  }

  async findByEmail(email: string): Promise<Technician | null> {
    const doc = await TechnicianModel.findOne({ email }).lean();
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };
  }

  async listTechnician(id: string): Promise<void> {
    await TechnicianModel.findByIdAndUpdate(id, { isListed: true });
  }

  async unlistTechnician(id: string): Promise<void> {
    await TechnicianModel.findByIdAndUpdate(id, { isListed: false });
  }
}