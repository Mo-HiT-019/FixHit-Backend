
import { User } from '../entities/user';

export interface IUserRepository{
    createUser(user:User): Promise<User>;
    findByEmail(email:string): Promise<User | null>;
    findById(_id:string):Promise <User | null>;
    updateByUser(_id:string,updates:Partial<User>): Promise<User | null>;
    findAllUsers(search?:string):Promise<User[]>
    blockUser(_id:string):Promise<void>;
    unblockUser(_id:string):Promise<void>;
} 

