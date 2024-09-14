import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Salon Booking</Link>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li>
  <Link to="/booking" className="hover:underline">Book Now</Link>
</li>
              <li>
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }      

export default Navbar;
