// src/components/ServiceForm.js
import React, { useState, useEffect } from 'react';

const ServiceForm = ({ selectedService, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: ''
  });

  useEffect(() => {
    if (selectedService) {
      setFormData({
        name: selectedService.name,
        description: selectedService.description,
        price: selectedService.price,
        duration: selectedService.duration,
        category: selectedService.category
      });
    }
  }, [selectedService]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        name="name"
        placeholder="Service Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (minutes)"
        value={formData.duration}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />

      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
        {selectedService ? 'Update Service' : 'Create Service'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-4"
      >
        Cancel
      </button>
    </form>
  );
};

export default ServiceForm;
