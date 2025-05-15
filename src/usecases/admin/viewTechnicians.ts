import { ITechnicianRepository } from "../../domain/repositories/technicianRepository";

export const viewAllTechnicians = (search?: string) => {
  return async (technicianRepo: ITechnicianRepository) => {
    return await technicianRepo.findAllTechnicians(search);
  };
};