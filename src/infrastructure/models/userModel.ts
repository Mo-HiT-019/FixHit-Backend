import mongoose,{Schema , Document} from 'mongoose';
import { User } from '../../domain/entities/user';


const userSchema = new Schema<User>({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:Date,
    profilePic:String,
    gender:String,
    address: {
        residential: { type: String },
        city: { type: String },
        district: { type: String },
        state: { type: String },
        pincode: { type: String }
    },
    wallet:{
        type:Number,
        default:0
    },
    isBlocked:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

export const UserModel = mongoose.model<User>('User',userSchema);

