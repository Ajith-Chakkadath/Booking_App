import React, { useState } from 'react';

const BookingPage = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: ''
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here we can send the form data to the backend via API
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Book Your Appointment</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Service Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">-- Choose a Service --</option>
            <option value="haircut">Haircut</option>
            <option value="manicure">Manicure</option>
            <option value="haircolor">Hair Coloring</option>
          </select>
        </div>

        {/* Date Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Choose Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Time Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Choose Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
