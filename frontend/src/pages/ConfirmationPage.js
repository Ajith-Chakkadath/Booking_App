import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { service, date, time } = location.state || {};  // Access passed state

  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Booking Confirmation</h1>
      <p className="text-lg mb-4">Thank you for booking your appointment!</p>
      <p className="text-lg mb-4"><strong>Service:</strong> {service}</p>
      <p className="text-lg mb-4"><strong>Date:</strong> {date}</p>
      <p className="text-lg mb-4"><strong>Time:</strong> {time}</p>
    </div>
  );
};

export default ConfirmationPage;
