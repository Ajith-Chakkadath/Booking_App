// src/pages/Admin/ServiceManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceForm from '../components/ServiceForm';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState(null); // Service to edit
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  // Get the admin token from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`, // Include the token in the headers
    },
  };

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/services'); // Adjust API endpoint if needed
        setServices(data);
      } catch (err) {
        setError('Failed to fetch services');
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  // Handle service deletion
  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`http://localhost:8080/api/services/${serviceId}`, config); // Include the token here
        setServices(services.filter((service) => service._id !== serviceId));
      } catch (error) {
        console.error('Failed to delete service', error);
        alert('Error deleting service');
      }
    }
  };

  // Handle service addition
  const handleAddService = async (newServiceData) => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/services', newServiceData, config); // Include the token here
      setServices([...services, data]); // Add the new service to the state
      setShowForm(false); // Hide the form after adding service
    } catch (error) {
      console.error('Error creating service', error);
      alert('Failed to create service');
    }
  };

  // Handle service editing
  const handleEditService = async (updatedServiceData) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/services/${selectedService._id}`, updatedServiceData, config); // Include the token here
      setServices(services.map((service) => (service._id === selectedService._id ? data : service)));
      setSelectedService(null); // Clear the selected service after editing
      setShowForm(false); // Hide the form after editing
    } catch (error) {
      console.error('Error updating service', error);
      alert('Failed to update service');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Services</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <button
            onClick={() => {
              setSelectedService(null); // Clear selection for adding new service
              setShowForm(true); // Show form for new service
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            Add New Service
          </button>

          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td className="border px-4 py-2">{service.name}</td>
                  <td className="border px-4 py-2">{service.description}</td>
                  <td className="border px-4 py-2">${service.price}</td>
                  <td className="border px-4 py-2">{service.duration} minutes</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => {
                        setSelectedService(service); // Select service to edit
                        setShowForm(true); // Show form with selected service
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Conditionally render the service form */}
          {showForm && (
            <ServiceForm
              selectedService={selectedService}
              onSubmit={selectedService ? handleEditService : handleAddService}
              onCancel={() => setShowForm(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ServiceManagement;
