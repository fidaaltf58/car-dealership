import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '../types/Vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="vehicle-card real-vehicle">
      <div className="vehicle-image">
        <div className="no-image">Vehicle Image</div>
        {vehicle.salePrice && vehicle.salePrice < vehicle.price && (
          <div className="sale-badge">SALE</div>
        )}
      </div>
      
      <div className="vehicle-content">
        <h3 className="vehicle-title">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        
        <div className="vehicle-specs">
          <div className="spec-item">
            <span className="spec-label">Stock #:</span>
            <span className="spec-value">{vehicle.stockNumber}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Mileage:</span>
            <span className="spec-value">{vehicle.mileage.toLocaleString()} miles</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Transmission:</span>
            <span className="spec-value">{vehicle.transmission}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Engine:</span>
            <span className="spec-value">{vehicle.engine}</span>
          </div>
        </div>

        <div className="vehicle-pricing">
          {vehicle.salePrice && vehicle.salePrice < vehicle.price ? (
            <>
              <div className="original-price">${vehicle.price.toLocaleString()}</div>
              <div className="sale-price">${vehicle.salePrice.toLocaleString()}</div>
              <div className="savings">Save ${(vehicle.price - vehicle.salePrice).toLocaleString()}</div>
            </>
          ) : (
            <div className="price">${vehicle.price.toLocaleString()}</div>
          )}
        </div>

        <div className="vehicle-actions">
          <Link to={`/vehicle/${vehicle._id}`} className="btn-primary">
            View Details
          </Link>
          <button className="btn-outline">Compare</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;