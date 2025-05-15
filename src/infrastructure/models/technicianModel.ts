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
  address: String,
  experience: Number,
  certification: {
    type: String 
  },
  categories: [String],
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
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
