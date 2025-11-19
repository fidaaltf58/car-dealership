export interface Vehicle {
    _id: string;
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
    createdAt: string;
    updatedAt: string;
  }