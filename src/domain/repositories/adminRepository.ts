import { Admin } from '../entities/admin'

export interface IAdminRepository{
    createAdmin(admin:Omit<Admin, "_id">):Promise<Admin>;
    findByUsername(username:string):Promise<Admin|null>;
}
