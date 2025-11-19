import React, { useState } from 'react';
import { Vehicle } from '../types/Vehicle';

interface Props {
  vehicle?: Vehicle;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const VehicleForm: React.FC<Props> = ({ vehicle, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    year: vehicle?.year || '',
    price: vehicle?.price || '',
    salePrice: vehicle?.salePrice || '',
    mileage: vehicle?.mileage || '',
    color: vehicle?.color || '',
    interior: vehicle?.interior || '',
    transmission: vehicle?.transmission || '',
    engine: vehicle?.engine || '',
    stockNumber: vehicle?.stockNumber || '',
    vin: vehicle?.vin || '',
    features: vehicle?.features?.join(', ') || ''
  });

  const [images, setImages] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    if (images) {
      for (let i = 0; i < images.length; i++) {
        data.append('images', images[i]);
      }
    }

    onSubmit(data);
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      {Object.keys(form).map(key => (
        <input
          key={key}
          type="text"
          value={(form as any)[key]}
          placeholder={key}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ))}

      <label>Upload Images:</label>
      <input type="file" multiple onChange={(e) => setImages(e.target.files)} />

      <button type="submit" className="btn-primary">Save</button>
      <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
    </form>
  );
};

export default VehicleForm;
