import { IUserRepository } from "../../domain/repositories/userRepository";
import { User } from "../../domain/entities/user";
import bcrypt from 'bcrypt';

export const loginUser =(email:string,password:string)=>{
    console.log("Login called")
    return async (userRepo: IUserRepository):Promise<{ user:User}> =>{
        const user = await userRepo.findByEmail(email);
        console.log("Login tryn user",user)
        if(!user) throw new Error("User Not found");

        const isPassValid = await bcrypt.compare(password,user.password);
        if(!isPassValid) throw new Error('Invalid Credentials');

        return {user};
    }
}
