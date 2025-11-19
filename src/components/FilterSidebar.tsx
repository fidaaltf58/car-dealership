import React from 'react';

interface FilterSidebarProps {
  filters: {
    priceRange: [number, number];
    yearRange: [number, number];
    mileageRange: [number, number];
    makes?: string[];
    transmissions?: string[];
    status?: string;
  };
  setFilters: (filters: any) => void;
  vehicleType: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, vehicleType }) => {
  const updateFilter = (key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="filter-sidebar">
      <h3>Filter Vehicles</h3>
      
      {/* Price Filter */}
      <div className="filter-group">
        <label>Price Range</label>
        <div className="range-values">
          <span>${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={filters.priceRange[1]}
          onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
          className="range-slider"
        />
      </div>

      {/* Year Filter */}
      <div className="filter-group">
        <label>Year Range</label>
        <div className="range-values">
          <span>{filters.yearRange[0]} - {filters.yearRange[1]}</span>
        </div>
        <input
          type="range"
          min="2010"
          max="2024"
          step="1"
          value={filters.yearRange[1]}
          onChange={(e) => updateFilter('yearRange', [filters.yearRange[0], parseInt(e.target.value)])}
          className="range-slider"
        />
      </div>

      {/* Mileage Filter */}
      <div className="filter-group">
        <label>Mileage Range</label>
        <div className="range-values">
          <span>{filters.mileageRange[0].toLocaleString()} mi - {filters.mileageRange[1].toLocaleString()} mi</span>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={filters.mileageRange[1]}
          onChange={(e) => updateFilter('mileageRange', [filters.mileageRange[0], parseInt(e.target.value)])}
          className="range-slider"
        />
      </div>

      {/* Make Filter */}
      <div className="filter-group">
        <label>Vehicle Make</label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" defaultChecked /> Acura
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Honda
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Toyota
          </label>
          <label>
            <input type="checkbox" defaultChecked /> BMW
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Mercedes-Benz
          </label>
        </div>
      </div>

      <button className="btn-outline full-width">
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;