import express from 'express';
import Vehicle from '../models/Vehicle';
import { upload } from '../middleware/upload';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create vehicle
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const images = req.files ? (req.files as Express.Multer.File[]).map(f => f.filename) : [];

    const features = req.body.features
      ? req.body.features.split(',').map(f => f.trim()).filter(Boolean)
      : [];

    const vehicle = await Vehicle.create({
      make: req.body.make,
      model: req.body.model,
      year: Number(req.body.year),
      price: Number(req.body.price),
      salePrice: req.body.salePrice ? Number(req.body.salePrice) : undefined,
      mileage: Number(req.body.mileage),
      color: req.body.color,
      interior: req.body.interior || '',
      transmission: req.body.transmission,
      engine: req.body.engine,
      stockNumber: req.body.stockNumber,
      vin: req.body.vin,
      features,
      images
    });

    res.status(201).json(vehicle);

  } catch (error: any) {
    console.error("❌ Error creating vehicle:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: `Duplicate value. ${Object.keys(error.keyPattern)[0]} must be unique.`
      });
    }

    res.status(400).json({
      message: "Validation error",
      error: error.message
    });
  }
});

export default router;
