import { IUserRepository } from "../../domain/repositories/userRepository";

export const viewAllUsers = (search? : string)=>{
    return async(userRepo:IUserRepository)=>{
        return await userRepo.findAllUsers(search);
    }
} 
