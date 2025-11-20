import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Vehicle } from './types/Vehicle';

// Composants
import Header from './components/Header';
import VehicleCard from './components/VehicleCard';
import FilterSidebar from './components/FilterSidebar';

// 3 VÉHICULES RÉELS - 2 À VENDRE, 1 À LOUER
const realVehicles: Vehicle[] = [
  {
    _id: 'acura-001545',
    make: 'Acura',
    model: 'ILX',
    year: 2021,
    price: 24350,
    salePrice: 21900,
    mileage: 46932,
    color: 'Black',
    interior: 'Leather',
    transmission: '8 Speed Automatic',
    engine: '2.4L 16-Valve D...',
    stockNumber: '001545',
    vin: '19UDEZF76MA001545',
    features: [
      'Sedan w/Premium Package',
      'Power Moonroof',
      'Leather Seats',
      'Navigation System',
      'Backup Camera',
      'Bluetooth',
      'Heated Seats',
      'Push Button Start',
      'Premium Audio',
      'LED Headlights'
    ],
    images: [
      '/images/vehicles/2/1.jpeg',
      '/images/vehicles/2/2.jpeg',
      '/images/vehicles/2/3.jpeg',
      '/images/vehicles/2/4.jpeg',
      '/images/vehicles/2/8.jpeg',
      '/images/vehicles/2/WhatsApp Image 2025-11-20 at 12.04.14.jpeg'
    ],
    status: 'for-rent',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    _id: 'honda-002001',
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    price: 28900,
    salePrice: 26900,
    mileage: 18500,
    color: 'Gray',
    interior: 'Leather',
    transmission: 'CVT Automatic',
    engine: '1.5L Turbo 4-Cylinder',
    stockNumber: '002001',
    vin: '5J6RE4H84NL012345',
    features: [
      'EX-L Trim',
      'Honda Sensing',
      'Apple CarPlay',
      'Android Auto',
      'LED Headlights',
      'Sunroof',
      'Heated Seats',
      'Dual Zone Climate',
      'Power Liftgate',
      'All-Wheel Drive'
    ],
    images: [
      '/images/vehicles/4/1.jpeg',
      '/images/vehicles/4/2.jpeg',
      '/images/vehicles/4/3.jpeg',
      '/images/vehicles/4/4.jpeg',
      '/images/vehicles/4/5.jpeg',
      '/images/vehicles/4/6.jpeg',
      '/images/vehicles/4/7.jpeg',

    ],
    status: 'for-rent',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    _id: 'bmw-003002',
    make: 'BMW',
    model: 'X3',
    year: 2023,
    price: 599, // Prix de location par mois
    mileage: 8900,
    color: 'White',
    interior: 'Premium Leather',
    transmission: '8-Speed Automatic',
    engine: '2.0L Turbo I4',
    stockNumber: '003002',
    vin: '5UXTR6C07PUL12345',
    features: [
      'M Sport Package',
      'Panoramic Sunroof',
      'Premium Package',
      'Heated Seats',
      'Navigation System',
      'Head-Up Display',
      'Parking Assistant',
      'Harmon Kardon Audio',
      'Wireless Charging',
      'Apple CarPlay'
    ],
    images: [
      '/images/vehicles/SMART/2.jpeg',
      '/images/vehicles/SMART/3.jpeg',
      '/images/vehicles/SMART/4.jpeg',
      '/images/vehicles/SMART/5.jpeg',
      '/images/vehicles/SMART/6.jpeg',
      '/images/vehicles/SMART/7.jpeg',
      '/images/vehicles/SMART/8.jpeg',
      '/images/vehicles/SMART/9.jpeg',
      '/images/vehicles/SMART/10.jpeg',
      '/images/vehicles/SMART/11.jpeg',
      '/images/vehicles/SMART/12.jpeg',
      'public/images/vehicles/SMART/WhatsApp Image 2025-11-19 at 18.48.23.jpeg',
    ],
    status: 'for-rent',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  }
];

// Composant pour détecter les hash dans l'URL
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

// PAGE D'ACCUEIL
function HomePage() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setFeaturedVehicles(realVehicles);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Vehicle</h1>
          <p>Best deals on quality cars for sale and rent</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => window.location.href = '/inventory'}>
              Browse Inventory
            </button>
            <button className="btn-secondary">
              Financing Options
            </button>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Vehicles</h2>
          <div className="vehicles-grid">
            {featuredVehicles.map(vehicle => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
          <div className="view-all">
            <button 
              className="btn-outline"
              onClick={() => window.location.href = '/inventory'}
            >
              View All Inventory
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Vehicle Sales</h3>
              <p>Quality pre-owned vehicles with comprehensive warranties</p>
            </div>
            <div className="service-card">
              <h3>Car Rental</h3>
              <p>Flexible rental options for short and long term</p>
            </div>
            <div className="service-card">
              <h3>Financing</h3>
              <p>Competitive financing rates for all credit types</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// PAGE INVENTAIRE COMPLET
function InventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('make');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setVehicles(realVehicles);
  }, []);

  const filteredVehicles = vehicles
    .filter(vehicle => {
      const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.year.toString().includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'year-new': return b.year - a.year;
        case 'year-old': return a.year - b.year;
        default: return a.make.localeCompare(b.make);
      }
    });
    return (
      <div className="inventory-page">
        <div className="container">
          <div className="inventory-header">
            <h1>Our Vehicle Inventory</h1>
            <p>Find your perfect vehicle from our selection</p>
          </div>
  
          {/* Search and Filter Bar */}
          <div className="search-filter-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by make, model, or year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="status-filter">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Vehicles</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>
            <div className="sort-filter">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="make">Sort: A to Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="year-old">Year: Oldest First</option>
              </select>
            </div>
          </div>
  
          {/* Inventory Stats */}
          <div className="inventory-stats">
            <span>{filteredVehicles.length} vehicles found</span>
            <span className="real-data-note">✓ Real Inventory Data</span>
          </div>
  
          {/* Vehicles Grid */}
          <div className="vehicles-grid">
            {filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
  
          {filteredVehicles.length === 0 && (
            <div className="no-vehicles">
              <h3>No vehicles match your search criteria</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    );
  }

// PAGE VOITURES
// PAGE VOITURES
function CarsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('make');
  const [filters, setFilters] = useState<{
    priceRange: [number, number];
    yearRange: [number, number];
    mileageRange: [number, number];
    makes: string[];
    transmissions: string[];
    status: string;
  }>({
    priceRange: [0, 100000],
    yearRange: [2010, 2024],
    mileageRange: [0, 100000],
    makes: [],
    transmissions: [],
    status: 'all'
  });

  useEffect(() => {
    const cars = realVehicles;
    setVehicles(cars);
    setFilteredVehicles(cars);
  }, []);

  useEffect(() => {
    let filtered = vehicles.filter(vehicle => 
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.year.toString().includes(searchTerm)
    );

    // Appliquer les filtres
    filtered = filtered.filter(vehicle => 
      vehicle.price >= filters.priceRange[0] && 
      vehicle.price <= filters.priceRange[1] &&
      vehicle.year >= filters.yearRange[0] && 
      vehicle.year <= filters.yearRange[1] &&
      vehicle.mileage >= filters.mileageRange[0] && 
      vehicle.mileage <= filters.mileageRange[1] &&
      (filters.status === 'all' || vehicle.status === filters.status)
    );

    // Trier
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'year-new': return b.year - a.year;
        case 'year-old': return a.year - b.year;
        case 'mileage-low': return a.mileage - b.mileage;
        case 'mileage-high': return b.mileage - a.mileage;
        default: return a.make.localeCompare(b.make);
      }
    });

    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, sortBy, filters]);

  return (
    <div className="inventory-page cars-page">
      <div className="container">
        <div className="inventory-header">
          <h1>Cars Inventory</h1>
          <p>Find your perfect car from our selection</p>
        </div>

        <div className="inventory-layout">
          {/* Sidebar Filters */}
          <FilterSidebar filters={filters} setFilters={setFilters} vehicleType="cars" />

          {/* Main Content */}
          <div className="inventory-main">
            {/* Search and Filter Bar */}
            <div className="search-filter-bar">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search cars by make, model, or year..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sort-filter">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="make">Sort: A to Z</option>
                  <option value="year-new">Year: Newest First</option>
                  <option value="year-old">Year: Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="mileage-low">Mileage: Low to High</option>
                  <option value="mileage-high">Mileage: High to Low</option>
                </select>
              </div>
            </div>

            {/* Inventory Stats */}
            <div className="inventory-stats">
              <span>{filteredVehicles.length} cars found</span>
              <span className="real-data-note">✓ Real Inventory Data</span>
            </div>

            {/* Vehicles Grid */}
            <div className="vehicles-grid">
              {filteredVehicles.map(vehicle => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="no-vehicles">
                <h3>No cars match your search criteria</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// PAGE SUVs
function SUVsPage() {
  return (
    <div className="inventory-page suvs-page">
      <div className="container">
        <div className="inventory-header">
          <h1>SUVs Inventory</h1>
          <p>Find your perfect SUV from our selection</p>
        </div>
        <div className="no-vehicles">
          <h3>SUV inventory coming soon</h3>
          <p>Check back later for our SUV selection</p>
        </div>
      </div>
    </div>
  );
}

// PAGE TRUCKS
function TrucksPage() {
  return (
    <div className="inventory-page trucks-page">
      <div className="container">
        <div className="inventory-header">
          <h1>Trucks Inventory</h1>
          <p>Find your perfect truck from our selection</p>
        </div>
        <div className="no-vehicles">
          <h3>Truck inventory coming soon</h3>
          <p>Check back later for our truck selection</p>
        </div>
      </div>
    </div>
  );
}

// PAGE SERVICES
function ServicesPage() {
  return (
    <div className="services-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Services</h1>
          <p>Professional automotive services for all your needs</p>
        </div>

        <div className="services-detail">
          <div className="service-category">
            <h2>Vehicle Services</h2>
            <div className="services-list">
              <div className="service-item">
                <h3>Oil Change & Maintenance</h3>
                <p>Regular oil changes and preventive maintenance to keep your vehicle running smoothly.</p>
                <ul>
                  <li>Oil & Filter Change</li>
                  <li>Brake Inspection & Service</li>
                  <li>Tire Rotation & Balance</li>
                  <li>Fluid Level Checks</li>
                </ul>
              </div>

              <div className="service-item">
                <h3>Brake Services</h3>
                <p>Complete brake system inspection, repair, and replacement services.</p>
                <ul>
                  <li>Brake Pad Replacement</li>
                  <li>Rotor Resurfacing/Replacement</li>
                  <li>Brake Fluid Flush</li>
                  <li>ABS System Repair</li>
                </ul>
              </div>

              <div className="service-item">
                <h3>Engine & Transmission</h3>
                <p>Professional engine and transmission diagnostics and repairs.</p>
                <ul>
                  <li>Engine Diagnostics</li>
                  <li>Transmission Service</li>
                  <li>Tune-ups</li>
                  <li>Emissions Testing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="service-category">
            <h2>Customer Services</h2>
            <div className="services-list">
              <div className="service-item">
                <h3>Financing</h3>
                <p>Flexible financing options tailored to your budget and credit situation.</p>
                <ul>
                  <li>New & Used Vehicle Loans</li>
                  <li>Lease Options</li>
                  <li>First-Time Buyer Programs</li>
                  <li>Bad Credit Solutions</li>
                </ul>
              </div>

              <div className="service-item">
                <h3>Test Drives</h3>
                <p>Schedule a test drive to experience your potential new vehicle.</p>
                <ul>
                  <li>Extended Test Drives</li>
                  <li>Weekend Test Drives</li>
                  <li>Home Delivery Test Drives</li>
                </ul>
              </div>

              <div className="service-item">
                <h3>Vehicle Appraisals</h3>
                <p>Get a fair market value appraisal for your current vehicle.</p>
                <ul>
                  <li>Trade-in Appraisals</li>
                  <li>Cash Offers</li>
                  <li>Instant Online Appraisals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// PAGE RENDEZ-VOUS
function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'test-drive',
    preferredDate: '',
    preferredTime: '',
    vehicleInterest: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your appointment request has been submitted. We will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: 'test-drive',
      preferredDate: '',
      preferredTime: '',
      vehicleInterest: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="appointment-page">
      <div className="container">
        <div className="page-header">
          <h1>Schedule an Appointment</h1>
          <p>Book your test drive, service appointment, or consultation</p>
        </div>

        <div className="appointment-layout">
          <div className="appointment-form-container">
            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="serviceType">Service Type *</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="test-drive">Test Drive</option>
                  <option value="service">Vehicle Service</option>
                  <option value="consultation">Sales Consultation</option>
                  <option value="financing">Financing Consultation</option>
                  <option value="appraisal">Vehicle Appraisal</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="preferredDate">Preferred Date *</label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferredTime">Preferred Time *</label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="vehicleInterest">Vehicle of Interest</label>
                <select
                  id="vehicleInterest"
                  name="vehicleInterest"
                  value={formData.vehicleInterest}
                  onChange={handleChange}
                >
                  <option value="">Select Vehicle</option>
                  <option value="acura-ilx">2021 Acura ILX</option>
                  <option value="honda-crv">2022 Honda CR-V</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any specific requirements or questions..."
                />
              </div>

              <button type="submit" className="btn-primary large">
                Schedule Appointment
              </button>
            </form>
          </div>

          <div className="appointment-info">
            <h3>Contact Information</h3>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Address:</strong>
                <p>1520 SW 22nd Ave, Miami, Florida.<br />United States 33145</p>
              </div>
              <div className="contact-item">
                <strong>Phone:</strong>
                <p>+1 (510) 631-3167</p>
              </div>
              <div className="contact-item">
                <strong>Hours:</strong>
                <p>
                  Mon-Fri: 9:00 AM - 8:00 PM<br />
                  Sat: 9:00 AM - 6:00 PM<br />
                  Sun: 11:00 AM - 5:00 PM
                </p>
              </div>
            </div>

            <div className="appointment-notes">
              <h4>What to Expect</h4>
              <ul>
                <li>Confirmation call within 24 hours</li>
                <li>Please bring your driver's license</li>
                <li>For test drives, allow 30-45 minutes</li>
                <li>Free vehicle appraisal available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// PAGE DÉTAILS VÉHICULE
function VehicleDetailsPage() {
  const vehicleId = window.location.pathname.split('/').pop();
  const vehicle = realVehicles.find(v => v._id === vehicleId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!vehicle) {
    return (
      <div className="vehicle-details-page">
        <div className="container">
          <div className="error-notice">
            <h2>Vehicle Not Found</h2>
            <p>The vehicle you're looking for doesn't exist.</p>
            <button onClick={() => window.location.href = '/inventory'} className="btn-primary">
              Back to Inventory
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  const selectImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="vehicle-details-page">
      <div className="container">
        <div className="vehicle-details">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image-container">
              <div className="main-image">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <>
                    <img 
                      src={vehicle.images[selectedImageIndex]} 
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="no-image-large hidden">
                      <div className="no-image-text">
                        <h3>{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                        <p>Image not available</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="no-image-large">
                    <div className="no-image-text">
                      <h3>{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                      <p>No images available</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Navigation Arrows */}
              {vehicle.images && vehicle.images.length > 1 && (
                <>
                  <button className="gallery-arrow gallery-arrow-prev" onClick={prevImage}>
                    ‹
                  </button>
                  <button className="gallery-arrow gallery-arrow-next" onClick={nextImage}>
                    ›
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {vehicle.images && vehicle.images.length > 1 && (
                <div className="image-counter">
                  {selectedImageIndex + 1} / {vehicle.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="thumbnail-gallery">
                {vehicle.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => selectImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} - View ${index + 1}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Info */}
          <div className="vehicle-info">
            <div className="vehicle-header">
              <h1>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
              <div className="vehicle-status-badge">
                {vehicle.status === 'for-sale' ? (
                  <span className="sale-badge-large">For Sale</span>
                ) : (
                  <span className="rent-badge-large">For Rent</span>
                )}
              </div>
            </div>
            
            <div className="stock-vin">
              <span><strong>Stock #:</strong> {vehicle.stockNumber}</span>
              <span><strong>VIN:</strong> {vehicle.vin}</span>
            </div>

            <div className="pricing-section">
              {vehicle.status === 'for-rent' ? (
                <div className="rental-pricing">
                  <div className="price">${vehicle.price.toLocaleString()}<span className="rental-label">/month</span></div>
                  <div className="rental-note">Rental price per month</div>
                </div>
              ) : vehicle.salePrice && vehicle.salePrice < vehicle.price ? (
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
                  <strong>Interior:</strong> {vehicle.interior}
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
                <h3>Features & Options</h3>
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
}

// PAGE ADMIN
function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="demo-notice">
          <h2>Admin Dashboard</h2>
          <p>Admin features are currently disabled. Real vehicle data is displayed on the website.</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary">
            View Real Inventory
          </button>
        </div>
      </div>
    </div>
  );
}

// PAGE LOGIN
function LoginPage() {
  return (
    <div className="login-page">
      <div className="container">
        <div className="demo-notice">
          <h2>Login</h2>
          <p>Admin login is currently disabled.</p>
          <button onClick={() => window.location.href = '/'} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// COMPOSANT PRINCIPAL APP
function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToHash />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/cars" element={<CarsPage />} />
          <Route path="/inventory/suvs" element={<SUVsPage />} />
          <Route path="/inventory/trucks" element={<TrucksPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;