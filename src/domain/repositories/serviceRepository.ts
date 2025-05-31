import { Service } from "../entities/service";

export interface IServiceRepository{

    createService(service:Omit<Service,"_id"|"createdAt"|"updatedAt">):Promise<Service>;
    findAllServiceS(search?:string,isActive?:boolean):Promise<Service[]>;
    findByName(name: string): Promise<Service | null>;
    updateService(_id: string, updates: Partial<Service>): Promise<Service | null>;
    deactivateService(_id: string): Promise<void>;
    activateService(_id: string): Promise<void>;
    deleteService(_id: string): Promise<void>;

}