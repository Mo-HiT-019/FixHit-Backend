import { IServiceRepository } from "../../domain/repositories/serviceRepository";
import { Service } from "../../domain/entities/service";

export const getAllServicesUseCase = async (
  repo: IServiceRepository,
  search?: string,
  isActive?: boolean
): Promise<Service[]> => {
  return await repo.findAllServiceS(search, isActive);
};
