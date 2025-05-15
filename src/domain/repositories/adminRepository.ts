import { Admin } from '../entities/admin'

export interface IAdminRepository{
    findByUsername(username:string):Promise<Admin|null>;
}
