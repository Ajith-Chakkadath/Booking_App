import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <p>&copy; {new Date().getFullYear()} Salon Booking. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
