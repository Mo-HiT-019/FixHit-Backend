import { Technician } from "../entities/technicain";

export interface ITechnicianRepository {
  createTechnician(technician: Omit<Technician, "_id">): Promise<Technician>;
  findAllTechnicians(search?:string): Promise<Technician[]>;
  findById(_id:string):Promise <Technician | null>;
  findByEmail(email: string): Promise<Technician | null>;
  listTechnician(_id: string): Promise<void>;
  unlistTechnician(_id: string): Promise<void>;
  updateTechnicianProfile(_id: string, updates: Partial<Technician>): Promise<Technician | null>;
  findTechniciansForVerification(): Promise<Technician[]>;
  markTechnicianAsVerified(_id: string): Promise<void>;
}
