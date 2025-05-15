import { ITechnicianRepository } from "../../domain/repositories/technicianRepository";

export const listTechnicianById = (id: string) => {
  return async (technicianRepo: ITechnicianRepository) => {
    await technicianRepo.listTechnician(id);
  };
};
