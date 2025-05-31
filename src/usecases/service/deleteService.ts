import { IServiceRepository } from "../../domain/repositories/serviceRepository";
import { Service } from "../../domain/entities/service";

export const deleteServiceUseCase = async (repo: IServiceRepository, id: string): Promise<void> => {
  await repo.deleteService(id);
};
