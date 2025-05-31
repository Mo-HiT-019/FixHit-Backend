import mongoose, { Schema } from 'mongoose';
import { Service } from '../../domain/entities/service'; 

const serviceSchema = new Schema<Service>({
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true, 
    },
}, {
    timestamps: true
});

export const ServiceModel = mongoose.model<Service>('Service', serviceSchema);