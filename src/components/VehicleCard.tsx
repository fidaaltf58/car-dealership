import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '../types/Vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const isForRent = vehicle.status === 'for-rent';

  return (
    <div className="vehicle-card real-vehicle">
      <div className="vehicle-image">
        {vehicle.images && vehicle.images.length > 0 ? (
          <img 
            src={vehicle.images[0]} 
            alt={`${vehicle.make} ${vehicle.model}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/vehicle-placeholder.jpg';
            }}
          />
        ) : (
          <div className="no-image">
            <div className="no-image-content">
              <span className="car-icon">🚗</span>
              <span>Image à venir</span>
            </div>
          </div>
        )}
        
        {/* Badge de statut */}
        {isForRent ? (
          <div className="status-badge rent-badge">FOR RENT</div>
        ) : vehicle.salePrice && vehicle.salePrice < vehicle.price ? (
          <div className="status-badge sale-badge">FOR SALE</div>
        ) : (
          <div className="status-badge sale-badge">FOR SALE</div>
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
        </div>

        <div className="vehicle-pricing">
          {isForRent ? (
            <div className="rental-pricing">
              <div className="price">${vehicle.price}/month</div>
              <div className="rental-label">Rental</div>
            </div>
          ) : (
            <>
              {vehicle.salePrice && vehicle.salePrice < vehicle.price ? (
                <>
                  <div className="original-price">${vehicle.price.toLocaleString()}</div>
                  <div className="sale-price">${vehicle.salePrice.toLocaleString()}</div>
                  <div className="savings">Save ${(vehicle.price - vehicle.salePrice).toLocaleString()}</div>
                </>
              ) : (
                <div className="price">${vehicle.price.toLocaleString()}</div>
              )}
            </>
          )}
        </div>

        <div className="vehicle-actions">
          <Link to={`/vehicle/${vehicle._id}`} className="btn-primary">
            View Details
          </Link>
          <button className="btn-outline">
            {isForRent ? 'Check Availability' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;