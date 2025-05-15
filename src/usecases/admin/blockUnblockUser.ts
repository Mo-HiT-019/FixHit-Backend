import { IUserRepository } from "../../domain/repositories/userRepository"

export const blockUserById = (id: string)=>{
    return async(userRepo:IUserRepository)=>{
        await userRepo.blockUser(id);
    }
}

export const unblockUserById = (id: string)=>{
    return async(userRepo:IUserRepository)=>{
        await userRepo.unblockUser(id);
    }
}

