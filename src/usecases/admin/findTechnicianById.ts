import { ITechnicianRepository } from "../../domain/repositories/technicianRepository";
import { Technician } from "../../domain/entities/technicain";

export const findTechnicianById = (id: string) => {
  return async (technicianRepo: ITechnicianRepository): Promise<Technician | null> => {
    return await technicianRepo.findById(id);
  };
};