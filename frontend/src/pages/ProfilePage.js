import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

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
        setFormData({ ...formData, name: profileResponse.data.name, email: profileResponse.data.email });

        // Fetch user bookings
        const bookingsResponse = await axios.get('http://localhost:8080/api/bookings/user', config);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [storedUserInfo.token]);

  // Handle form field changes for profile update
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile update submission
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${storedUserInfo.token}`,
        },
      };

      // Send the updated profile data to the backend
      const response = await axios.put('http://localhost:8080/api/auth/profile', { name: formData.name, password: formData.password }, config);

      setMessage('Profile updated successfully!');

      // Update local storage with the new user info if the name is changed
      localStorage.setItem('userInfo', JSON.stringify({ ...storedUserInfo, name: formData.name }));

      // Optionally, refresh the user info displayed on the page
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Profile update failed. Please try again.');
    }
  };

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

      {message && (
        <div className={`text-center ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </div>
      )}

      {/* Profile Update Form */}
      <form onSubmit={handleProfileUpdate} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Update Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled  // Disable the email input field
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password (Leave blank if unchanged)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Update Profile
        </button>
      </form>

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
