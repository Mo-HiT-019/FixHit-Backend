import { IServiceRepository } from "../../domain/repositories/serviceRepository";
import { Service } from "../../domain/entities/service";
import { FilterQuery } from "mongoose";
import { ServiceModel } from "../models/serviceModel";


export class ServiceRepoImpl implements IServiceRepository {
  
  async createService(service: Omit<Service, "_id" | "createdAt" | "updatedAt">): Promise<Service> {
    const newService = new ServiceModel(service);
    const savedService = await newService.save();
    return savedService.toObject();
  }

  async findAllServiceS(search?: string, isActive?: boolean): Promise<Service[]> {
    const filter: FilterQuery<typeof ServiceModel> = {};
    
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (typeof isActive === "boolean") {
      filter.isActive = isActive;
    }

    const services = await ServiceModel.find(filter).sort({ createdAt: -1 });
    return services.map(service => service.toObject());
  }

  async findByName(name: string): Promise<Service | null> {
    const service = await ServiceModel.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    return service ? service.toObject() : null;
  }

  async updateService(_id: string, updates: Partial<Service>): Promise<Service | null> {
    const updatedService = await ServiceModel.findByIdAndUpdate(_id, updates, { new: true });
    return updatedService ? updatedService.toObject() : null;
  }

  async deactivateService(_id: string): Promise<void> {
    await ServiceModel.findByIdAndUpdate(_id, { isActive: false });
  }

  async activateService(_id: string): Promise<void> {
    await ServiceModel.findByIdAndUpdate(_id, { isActive: true });
  }

  async deleteService(_id: string): Promise<void> {
    await ServiceModel.findByIdAndDelete(_id);
  }
}
