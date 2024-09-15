import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');  // Clear user info from localStorage
    navigate('/login');  // Redirect to login page after logout
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Salon Booking</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          {userInfo ? (
            <>
              <li>
                <Link to="/booking" className="hover:underline">Book Now</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:underline">Profile</Link>  {/* Link to Profile Page */}
              </li>
              <li>
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:underline">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
