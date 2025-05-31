import { IServiceRepository } from "../../domain/repositories/serviceRepository";
import { Service } from "../../domain/entities/service";

export const createService = async(
    repo:IServiceRepository,
    data:Omit<Service,"_id"|"createdAt"|"updatedAt">
):Promise<Service> =>{
    const exists = await repo.findByName(data.name);
    if(exists){
        throw new Error("Service already existss..");
    }
    return await repo.createService(data);
}