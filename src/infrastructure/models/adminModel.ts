import mongoose from "mongoose";
import { Admin } from "../../domain/entities/admin";

const AdminSchema = new mongoose.Schema<Admin>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true}
)

export const AdminModel = mongoose.model<Admin>("Admin",AdminSchema)