import { Technician } from "../../domain/entities/technicain";
import { TechnicianRepoImpl } from "../../infrastructure/repositories/technicianRepoImpl";

export const getTechniciansForVerification = async (): Promise<Technician[]> => {
  const technicianRepo = new TechnicianRepoImpl();
  return await technicianRepo.findTechniciansForVerification();
};