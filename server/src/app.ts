import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import vehicleRoutes from "./routes/vehicles";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

// Convert PORT to number for TypeScript
const PORT: number = Number(process.env.PORT) || 5000;
const MONGO_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/car_dealership";

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection (Mongoose v7+)
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
