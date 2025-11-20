import React, { useState, useEffect } from 'react';
import { getVehicles } from '../utils/api';
import { Vehicle } from '../types/Vehicle';

const Inventory: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await getVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading inventory...</div>;
  }

  return (
    <div className="inventory">
      <div className="inventory-header">
        <h1>Our Vehicle Inventory</h1>
        <p>Find your perfect vehicle from our selection</p>
      </div>

      {vehicles.length === 0 ? (
        <div className="no-vehicles">
          <h2>No vehicles available at the moment</h2>
          <p>Please check back later for new inventory.</p>
        </div>
      ) : (
        <div className="vehicles-grid">
          {vehicles.map(vehicle => (
            <div key={vehicle._id} className="vehicle-card">
              <div className="vehicle-image">
                {vehicle.images[0] ? (
                  <img 
                    src={`/uploads/${vehicle.images[0]}`} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="vehicle-details">
                <h3>{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                <div className="vehicle-specs">
                  <p><strong>Price:</strong> ${vehicle.price.toLocaleString()}</p>
                  <p><strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles</p>
                  <p><strong>Color:</strong> {vehicle.color}</p>
                  <p><strong>Transmission:</strong> {vehicle.transmission}</p>
                  <p><strong>Stock #:</strong> {vehicle.stockNumber}</p>
                </div>
                {vehicle.features.length > 0 && (
                  <div className="vehicle-features">
                    <strong>Features:</strong> {vehicle.features.slice(0, 3).join(', ')}
                    {vehicle.features.length > 3 && '...'}
                  </div>
                )}
                <button className="btn-view-details">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;