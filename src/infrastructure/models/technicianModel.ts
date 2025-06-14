import mongoose, { Schema } from 'mongoose';
import { Technician } from '../../domain/entities/technicain';

const technicianSchema = new Schema<Technician>({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: String,
  dob: Date,
  gender: String,
  address: {

  residential: { type: String },
  city: { type: String },
  district: { type: String },
  state: { type: String },
  pincode: { type: String }
  },
  experience: Number,
  certification: {
    type: String 
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  documents:[{
    type:String
  }],
  verificationId:[{
    type:String
  }],
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationRequested:{
    type:Boolean,
    default:false
  },
  isListed: {
    type: Boolean,
    default: false,
  },
  wallet: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export const TechnicianModel = mongoose.model<Technician>('Technician', technicianSchema);
