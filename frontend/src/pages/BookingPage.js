import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: ''
  });
  const [services, setServices] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Get the authentication token from local storage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Config for Axios requests with token in headers
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };

  // Fetch available services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/services', config); // Include token in the request
        setServices(data); // Set the available services from backend
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  // Fetch working hours
  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/working-hours', config); // Include token in the request
        setWorkingHours(data); // Set the available working hours
      } catch (error) {
        console.error('Error fetching working hours:', error);
      }
    };
    fetchWorkingHours();
  }, []);

  // Fetch holidays
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/holidays', config); // Include token in the request
        setHolidays(data); // Set the holidays
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };
    fetchHolidays();
  }, []);

  // Check if selected date is a holiday
  const isHoliday = (selectedDate) => {
    return holidays.some(holiday => holiday.date === selectedDate); // Assuming holidays are stored in 'YYYY-MM-DD' format
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // If the date changes, update available times based on working hours
    if (e.target.name === 'date') {
      const selectedDay = new Date(e.target.value).toLocaleString('en-US', { weekday: 'long' });
      const workingHoursForDay = workingHours.find(hours => hours.day === selectedDay);

      if (workingHoursForDay && !isHoliday(e.target.value)) {
        setAvailableTimes(generateTimeSlots(workingHoursForDay.startTime, workingHoursForDay.endTime));
      } else {
        setAvailableTimes([]); // No available times on holidays or days without working hours
      }
    }
  };

  // Function to generate time slots between start and end time
  const generateTimeSlots = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const timeSlots = [];

    while (start < end) {
      timeSlots.push(start.toTimeString().substring(0, 5)); // Push time in 'HH:MM' format
      start.setMinutes(start.getMinutes() + 30); // Increment by 30 minutes
    }

    return timeSlots;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the booking data along with the token
      const response = await axios.post('http://localhost:8080/api/bookings', formData, config);
      setMessage('Booking successful!');  // Success message
      setSuccess(true);
      // Redirect to confirmation page with the booking details
      navigate('/confirmation', { state: { ...formData } });
    } catch (error) {
      console.error('Error booking:', error);
      setMessage(error.response?.data?.message || 'Booking failed, please try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Book Your Appointment</h1>

      {message && (
        <div className={`text-center ${success ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </div>
      )}

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
            {services.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name} - ${service.price} {/* Display service price */}
              </option>
            ))}
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
          {isHoliday(formData.date) && (
            <p className="text-red-500 text-sm mt-2">This date is a holiday. Please select another date.</p>
          )}
        </div>

        {/* Time Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Choose Time</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
            disabled={!availableTimes.length}
          >
            <option value="">-- Choose a Time --</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {!availableTimes.length && formData.date && (
            <p className="text-red-500 text-sm mt-2">No available times for the selected date.</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          disabled={isHoliday(formData.date) || !availableTimes.length}
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
