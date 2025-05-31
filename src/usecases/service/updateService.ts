import { IServiceRepository } from "../../domain/repositories/serviceRepository";
import { Service } from "../../domain/entities/service";


export const updateServiceUseCase = async (
  repo: IServiceRepository,
  id: string,
  updates: Partial<Service>
): Promise<Service | null> => {
  return await repo.updateService(id, updates);
};