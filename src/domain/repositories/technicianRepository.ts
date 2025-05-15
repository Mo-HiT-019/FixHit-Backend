import { Technician } from "../entities/technicain";

export interface ITechnicianRepository {
  createTechnician(technician: Omit<Technician, "id">): Promise<Technician>;
  findAllTechnicians(search?:string): Promise<Technician[]>;
  findByEmail(email: string): Promise<Technician | null>;
  listTechnician(id: string): Promise<void>;
  unlistTechnician(id: string): Promise<void>;
}
