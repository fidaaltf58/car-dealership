import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Vehicle } from '../types/Vehicle';

const VehicleDetails: React.FC = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vehicles/${id}`);
      setVehicle(response.data);
    } catch (error) {
      console.error('Error loading vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading vehicle details...</div>;
  if (!vehicle) return <div className="error">Vehicle not found</div>;

  return (
    <div className="vehicle-details-page">
      <div className="container">
        <div className="vehicle-details">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image">
              {vehicle.images && vehicle.images.length > 0 ? (
                <img 
                  src={`http://localhost:5000/uploads/${vehicle.images[activeImage]}`} 
                  alt={`${vehicle.make} ${vehicle.model}`}
                />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
            </div>
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="image-thumbnails">
                {vehicle.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${image}`}
                    alt={`${vehicle.make} ${vehicle.model} ${index + 1}`}
                    className={index === activeImage ? 'active' : ''}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Info */}
          <div className="vehicle-info">
            <h1>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
            <div className="stock-vin">
              <span><strong>Stock #:</strong> {vehicle.stockNumber}</span>
              <span><strong>VIN:</strong> {vehicle.vin}</span>
            </div>

            <div className="pricing-section">
              {vehicle.salePrice && vehicle.salePrice < vehicle.price ? (
                <>
                  <div className="price-comparison">
                    <span className="original-price">${vehicle.price.toLocaleString()}</span>
                    <span className="sale-price">${vehicle.salePrice.toLocaleString()}</span>
                  </div>
                  <div className="savings">
                    You Save ${(vehicle.price - vehicle.salePrice).toLocaleString()}
                  </div>
                </>
              ) : (
                <div className="price">${vehicle.price.toLocaleString()}</div>
              )}
            </div>

            <div className="specifications">
              <h3>Vehicle Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles
                </div>
                <div className="spec-item">
                  <strong>Color:</strong> {vehicle.color}
                </div>
                <div className="spec-item">
                  <strong>Interior:</strong> {vehicle.interior || 'N/A'}
                </div>
                <div className="spec-item">
                  <strong>Transmission:</strong> {vehicle.transmission}
                </div>
                <div className="spec-item">
                  <strong>Engine:</strong> {vehicle.engine}
                </div>
                <div className="spec-item">
                  <strong>Drive:</strong> FWD
                </div>
              </div>
            </div>

            {vehicle.features && vehicle.features.length > 0 && (
              <div className="features">
                <h3>Features</h3>
                <ul>
                  {vehicle.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="action-buttons">
              <button className="btn-primary large">Schedule Test Drive</button>
              <button className="btn-outline large">Get Pre-Approved</button>
              <button className="btn-secondary large">Make an Offer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;