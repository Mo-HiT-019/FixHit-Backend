import { IUserRepository } from "../../domain/repositories/userRepository";
import { User } from "../../domain/entities/user";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'fixHitJWTSecret';

export const loginUser =(email:string,password:string)=>{
    return async (userRepo: IUserRepository):Promise<{token:string; user:User}> =>{
        const user = await userRepo.findByEmail(email);
        if(!user) throw new Error("User Not found");

        const isPassValid = await bcrypt.compare(password,user.password);
        if(!isPassValid) throw new Error('Invalid Credentials');

        const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET,{
            expiresIn:"7d"
        });

        return {token,user};
    }
}
