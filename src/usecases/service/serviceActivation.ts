import { IServiceRepository } from "../../domain/repositories/serviceRepository";
import { Service } from "../../domain/entities/service";



export const deactivateServiceUseCase = async (repo: IServiceRepository, id: string): Promise<void> => {
  await repo.deactivateService(id);
};

export const activateServiceUseCase = async (repo: IServiceRepository, id: string): Promise<void> => {
  await repo.activateService(id);
};
