
import { Technician } from "../../domain/entities/technicain";
import { TechnicianRepoImpl } from "../../infrastructure/repositories/technicianRepoImpl";

export const completeTechnicianProfile = async (
  technicianId: string,
  profilePicFile: Express.Multer.File | undefined,
  documentFiles: Express.Multer.File[] | undefined,
  verificationIdFiles: Express.Multer.File[] | undefined,
  formData: Partial<Technician> 
): Promise<Technician | null> => {
  const technicianRepo = new TechnicianRepoImpl();

  const updateData: Partial<Technician> = { ...formData };

 
  if (profilePicFile) {
    updateData.profilePic = profilePicFile.path;
  }

  if (documentFiles && documentFiles.length > 0) {
    updateData.documents = documentFiles.map((file) => file.path);
  }


  if (verificationIdFiles && verificationIdFiles.length > 0) {
    updateData.verificationId = verificationIdFiles.map((file) => file.path);
  }


  if (updateData.services && !Array.isArray(updateData.services)) {
    updateData.services = String(updateData.services).split(',').map(s => s.trim());
  }

 
  updateData.profileCompleted = true;
  updateData.verificationRequested = true;

  try {
    const updatedTechnician = await technicianRepo.updateTechnicianProfile(
      technicianId,
      updateData
    );
    return updatedTechnician;
  } catch (error) {
    console.error("Error in completeTechnicianProfile use case:", error);
    throw new Error("Failed to complete technician profile.");
  }
};