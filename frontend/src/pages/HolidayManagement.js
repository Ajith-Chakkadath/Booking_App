// src/pages/Admin/HolidayManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HolidayManagement = () => {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ date: '', reason: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get the admin token from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`, // Include the token in the headers
    },
  };

  // Fetch holidays from backend
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/holidays');
        setHolidays(data);
      } catch (err) {
        setError('Failed to fetch holidays');
      }
      setLoading(false);
    };

    fetchHolidays();
  }, []);

  // Handle holiday addition
  const handleAddHoliday = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/holidays', newHoliday, config);
      setHolidays([...holidays, data]);
      setNewHoliday({ date: '', reason: '' }); // Reset form
    } catch (error) {
      console.error('Error adding holiday', error);
      alert('Failed to add holiday');
    }
  };

  // Handle holiday deletion
  const handleDeleteHoliday = async (holidayId) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      try {
        await axios.delete(`http://localhost:8080/api/holidays/${holidayId}`, config);
        setHolidays(holidays.filter((holiday) => holiday._id !== holidayId));
      } catch (error) {
        console.error('Error deleting holiday', error);
        alert('Failed to delete holiday');
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Holidays</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {/* Add Holiday Form */}
          <form onSubmit={handleAddHoliday} className="mb-6">
            <input
              type="date"
              value={newHoliday.date}
              onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
              required
              className="border p-2 mr-4"
            />
            <input
              type="text"
              placeholder="Reason for holiday"
              value={newHoliday.reason}
              onChange={(e) => setNewHoliday({ ...newHoliday, reason: e.target.value })}
              required
              className="border p-2 mr-4"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded">Add Holiday</button>
          </form>

          {/* Holiday List */}
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday) => (
                <tr key={holiday._id}>
                  <td className="border px-4 py-2">{new Date(holiday.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{holiday.reason}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDeleteHoliday(holiday._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default HolidayManagement;
