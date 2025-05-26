import { Technician } from "../entities/technicain";

export interface ITechnicianRepository {
  createTechnician(technician: Omit<Technician, "_id">): Promise<Technician>;
  findAllTechnicians(search?:string): Promise<Technician[]>;
  findByEmail(email: string): Promise<Technician | null>;
  listTechnician(_id: string): Promise<void>;
  unlistTechnician(_id: string): Promise<void>;
}
