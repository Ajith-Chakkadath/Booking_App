// src/pages/Admin/AdminDashboard.js
import React, { useState } from 'react';
import ServiceManagement from './ServiceManagement';
import HolidayManagement from './HolidayManagement'
import WorkingHoursManagement from './WorkingHoursManagement';
import ManageUsers from './ManageUsers';
import ManageBookings from './ManageBookings';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('users'); // Default to 'users' page

  // Function to render the correct content based on the active page
  const renderContent = () => {
    switch (activePage) {
      case 'users':
        return <ManageUsers />;
      case 'bookings':
        return <ManageBookings />;
      case 'services':
        return <ServiceManagement />;
      case 'holidays':
        return <HolidayManagement />;
      case 'working-hours':
        return <WorkingHoursManagement />;
      default:
        return <ManageUsers />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-4 cursor-pointer" onClick={() => setActivePage('users')}>
            Manage Users
          </li>
          <li className="mb-4 cursor-pointer" onClick={() => setActivePage('bookings')}>
            Manage Bookings
          </li>
          <li className="mb-4 cursor-pointer" >
            Manage Services
            <ul className="ml-4 mt-2">
              <li className="mb-2 cursor-pointer" onClick={() => setActivePage('services')}>
                Services Updating
              </li>
              <li className="mb-2 cursor-pointer" onClick={() => setActivePage('holidays')}>
                Holidays
              </li>
              <li className="mb-2 cursor-pointer" onClick={() => setActivePage('working-hours')}>
                Working Hours
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-3/4 bg-white p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
