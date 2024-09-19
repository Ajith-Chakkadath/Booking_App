// src/pages/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
  console.log(storedUserInfo)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={() => navigate('/admin/users')} className="bg-blue-600 text-white p-4 rounded-lg cursor-pointer text-center hover:bg-blue-700">
          Manage Users
        </div>
        <div onClick={() => navigate('/admin/bookings')} className="bg-green-600 text-white p-4 rounded-lg cursor-pointer text-center hover:bg-green-700">
          Manage Bookings
        </div>
        <div onClick={() => navigate('/admin/services')} className="bg-purple-600 text-white p-4 rounded-lg cursor-pointer text-center hover:bg-purple-700">
          Manage Services
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
