import React, { useState, useEffect } from 'react';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../utils/api';
import { Vehicle } from '../types/Vehicle';
import VehicleForm from '../components/VehicleForm';

const AdminDashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
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

  const handleCreate = async (formData: FormData) => {
    try {
      await createVehicle(formData);
      loadVehicles();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating vehicle:', error);
      alert('Error creating vehicle. Please check all fields and try again.');
    }
  };

  const handleUpdate = async (formData: FormData) => {
    if (!editingVehicle) return;
    try {
      await updateVehicle(editingVehicle._id, formData);
      loadVehicles();
      setEditingVehicle(null);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      alert('Error updating vehicle. Please check all fields and try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await deleteVehicle(id);
        loadVehicles();
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        alert('Error deleting vehicle.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Add New Vehicle
          </button>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>

      {(showForm || editingVehicle) && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
            <VehicleForm
              vehicle={editingVehicle || undefined}
              onSubmit={editingVehicle ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingVehicle(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="vehicles-list">
        <h2>Vehicles ({vehicles.length})</h2>
        {vehicles.length === 0 ? (
          <p className="no-vehicles">No vehicles found. Add your first vehicle!</p>
        ) : (
          <div className="vehicles-grid">
            {vehicles.map(vehicle => (
              <div key={vehicle._id} className="vehicle-card">
                {vehicle.images[0] && (
                  <img 
                    src={`http://localhost:5000/uploads/${vehicle.images[0]}`} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                  />
                )}
                <div className="vehicle-info">
                  <h3>{vehicle.make} {vehicle.model} ({vehicle.year})</h3>
                  <p><strong>Stock #:</strong> {vehicle.stockNumber}</p>
                  <p><strong>Price:</strong> ${vehicle.price.toLocaleString()}</p>
                  <p><strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles</p>
                  <p><strong>Color:</strong> {vehicle.color}</p>
                </div>
                <div className="vehicle-actions">
                  <button 
                    onClick={() => setEditingVehicle(vehicle)} 
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(vehicle._id)} 
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;