// src/pages/ManageBookings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
          
        const config = {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`,
            
          },
        };
    
        const { data } = await axios.get('http://localhost:8080/api/admin/bookings', config);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id} className="p-4 bg-gray-100 mb-4 rounded-lg">
            <p><strong>Service:</strong> {booking.service}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {booking.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBookings;
