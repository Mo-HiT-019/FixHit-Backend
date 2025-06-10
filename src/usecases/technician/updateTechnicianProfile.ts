import { Technician } from "../../domain/entities/technicain";
import { TechnicianRepoImpl } from "../../infrastructure/repositories/technicianRepoImpl";

export const updateTechnicianProfile=async(
    technicianId : string,
    updates:Partial<Omit<Technician, 'profileCompleted' | 'verificationRequested' >>
):Promise<Technician|null> =>{
    const technicianRepo = new TechnicianRepoImpl();

    const profileUpdates: Partial<Technician> = {
    ...updates,
    profileCompleted: true,
    verificationRequested: true,
  };

  return await technicianRepo.updateTechnicianProfile(technicianId, profileUpdates);

}