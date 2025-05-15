import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/userRepository";
import bcrypt from 'bcrypt';

export const createUser = async(userData:Omit<User,'id'| 'createdAt' | 'updatedAt' >)=>{

    console.log(userData)
    return async(userRepo:IUserRepository)=>{

        const existingUser = await userRepo.findByEmail(userData.email);
        if(existingUser){
            throw new Error('Mail already registered');
        }

        const hashedPassword = await bcrypt.hash(userData.password,10)

        const newUser:User ={
            ...userData,
            password:hashedPassword,
            wallet:0,
            isBlocked:false
        }

        return await userRepo.createUser(newUser);
    }
}