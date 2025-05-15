import { ITechnicianRepository } from "../../domain/repositories/technicianRepository";

export const unlistTechnicianById = (id: string) => {
  return async (technicianRepo: ITechnicianRepository) => {
    await technicianRepo.unlistTechnician(id);
  };
};