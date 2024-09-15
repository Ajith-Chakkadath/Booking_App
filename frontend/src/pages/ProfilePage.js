import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Fetch user profile and bookings
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`,
          },
        };

        // Fetch user profile
        const profileResponse = await axios.get('http://localhost:8080/api/auth/profile', config);
        setUserInfo(profileResponse.data);

        // Fetch user bookings
        const bookingsResponse = await axios.get('http://localhost:8080/api/bookings/user', config);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [storedUserInfo.token]);

  // Function to cancel a booking
  const cancelBooking = async (bookingId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${storedUserInfo.token}`,
        },
      };

      await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`, config);
      alert('Booking canceled successfully');

      // Remove the canceled booking from the list
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Failed to cancel the booking');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* Profile Details */}
      {userInfo ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Profile Details</h2>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {/* Bookings Section */}
      <h2 className="text-2xl font-bold mt-6">Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul className="mt-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
              <p><strong>Service:</strong> {booking.service}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg mt-2"
                onClick={() => cancelBooking(booking._id)}
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
