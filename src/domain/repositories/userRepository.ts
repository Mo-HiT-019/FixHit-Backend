
import { User } from '../entities/user';

export interface IUserRepository{
    createUser(user:User): Promise<User>;
    findByEmail(email:string): Promise<User | null>;
    findById(id:string):Promise <User | null>;
    updateByUser(id:string,updates:Partial<User>): Promise<User | null>;
} 

