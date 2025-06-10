import { Technician } from "../../domain/entities/technicain";
import { TechnicianRepoImpl } from "../../infrastructure/repositories/technicianRepoImpl";


export const markTechnicianAsVerified = async (
  technicianId: string
): Promise<void> => {
  const technicianRepo = new TechnicianRepoImpl();
  await technicianRepo.markTechnicianAsVerified(technicianId);
};