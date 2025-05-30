import {IUserRepository} from '../../domain/repositories/userRepository';
import { UserModel } from '../models/userModel';
import { User } from '../../domain/entities/user';

export class UserRepoImpl implements IUserRepository{

    async createUser(user: User): Promise<User> {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();
        return savedUser.toObject();
    }

    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({email}).lean();
    }

    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id).lean();
    }

    async updateByUser(_id: string, updates: Partial<User>): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(_id,updates,{new:true}).lean();
    }

    async findAllUsers(search?: string): Promise<User[]> {
        const query = search ? { fullname: { $regex: search, $options: "i" } } : {};
    return await UserModel.find(query).select("-password");
    }

    async blockUser(_id:string):Promise<void>{
        await UserModel.findByIdAndUpdate(_id,{isBlocked:true})
    }

    async unblockUser(_id:string):Promise<void>{
        await UserModel.findByIdAndUpdate(_id,{isBlocked:false})
    }
    

}