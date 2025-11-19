import mongoose, { Document, Schema } from 'mongoose';

export interface IVehicle extends Document {
  make: string;
  model: string;
  year: number;
  price: number;
  salePrice?: number;
  mileage: number;
  color: string;
  interior?: string;
  transmission: string;
  engine: string;
  stockNumber: string;
  vin: string;
  features: string[];
  images: string[];
  status: 'available' | 'sold';
}

const vehicleSchema = new Schema<IVehicle>({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  mileage: { type: Number, required: true },
  color: { type: String, required: true },
  interior: { type: String },
  transmission: { type: String, required: true },
  engine: { type: String, required: true },
  stockNumber: { type: String, required: true, unique: true },
  vin: { type: String, required: true, unique: true },
  features: [{ type: String }],
  images: [{ type: String }],
  status: { type: String, enum: ['available', 'sold'], default: 'available' }
}, {
  timestamps: true
});

export default mongoose.model<IVehicle>('VehicleItem', vehicleSchema);
