import { Technician } from "../../domain/entities/technicain";
import { ITechnicianRepository } from "../../domain/repositories/technicianRepository";
import {TechnicianModel} from "../models/technicianModel";

export class TechnicianRepoImpl implements ITechnicianRepository {
  
  async createTechnician(technician: Technician): Promise<Technician> {
    const newTech = new TechnicianModel(technician);
    const saved = await newTech.save();
    const { _id, ...rest } = saved.toObject();
    return { _id: _id.toString(), ...rest };
  }

  async findAllTechnicians(search?: string): Promise<Technician[]> {
    const query = search ? { fullname: { $regex: search, $options: "i" } } : {};
    return await TechnicianModel.find(query).select("-password");
  }

  async findByEmail(email: string): Promise<Technician | null> {
    const doc = await TechnicianModel.findOne({ email }).lean();
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return { _id: _id.toString(), ...rest };
  }

  async listTechnician(_id: string): Promise<void> {
    await TechnicianModel.findByIdAndUpdate(_id, { isListed: true });
  }

  async findById(_id: string): Promise<Technician | null> {
  return await TechnicianModel.findById(_id);
}


  async unlistTechnician(_id: string): Promise<void> {
    await TechnicianModel.findByIdAndUpdate(_id, { isListed: false });
  }

  async updateTechnicianProfile(_id: string, updates: Partial<Technician>): Promise<Technician | null> {
    const updatedDoc = await TechnicianModel.findByIdAndUpdate(
      _id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedDoc) return null;
    const { _id: docId, ...rest } = updatedDoc;
    return { _id: docId.toString(), ...rest } as Technician;
  }

  async findTechniciansForVerification(): Promise<Technician[]> {
    const unverifiedTechs = await TechnicianModel.find({ verificationRequested: true }).select("-password").lean();

    console.log("Req verification techiss",unverifiedTechs)

    return unverifiedTechs.map(({ _id, ...rest }) => ({ _id: _id.toString(), ...rest }));
  }

  async markTechnicianAsVerified(_id: string): Promise<void> {
    await TechnicianModel.findByIdAndUpdate(_id, { isVerified: true, verificationRequested:false });
  }


}