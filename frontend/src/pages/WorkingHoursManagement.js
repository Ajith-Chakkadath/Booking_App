// src/pages/Admin/WorkingHoursManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkingHoursManagement = () => {
  const [workingHours, setWorkingHours] = useState([]);
  const [newWorkingHours, setNewWorkingHours] = useState({ day: '', startTime: '', endTime: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get the admin token from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`, // Include the token in the headers
    },
  };

  // Fetch working hours from backend
  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/working-hours');
        setWorkingHours(data);
      } catch (err) {
        setError('Failed to fetch working hours');
      }
      setLoading(false);
    };

    fetchWorkingHours();
  }, []);

  // Handle working hours addition
  const handleAddWorkingHours = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/working-hours', newWorkingHours, config);
      setWorkingHours([...workingHours, data]);
      setNewWorkingHours({ day: '', startTime: '', endTime: '' }); // Reset form
    } catch (error) {
      console.error('Error adding working hours', error);
      alert('Failed to add working hours');
    }
  };

  // Handle working hours deletion
  const handleDeleteWorkingHours = async (workingHoursId) => {
    if (window.confirm('Are you sure you want to delete these working hours?')) {
      try {
        await axios.delete(`http://localhost:8080/api/working-hours/${workingHoursId}`, config);
        setWorkingHours(workingHours.filter((hours) => hours._id !== workingHoursId));
      } catch (error) {
        console.error('Error deleting working hours', error);
        alert('Failed to delete working hours');
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Working Hours</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {/* Add Working Hours Form */}
          <form onSubmit={handleAddWorkingHours} className="mb-6">
            <select
              value={newWorkingHours.day}
              onChange={(e) => setNewWorkingHours({ ...newWorkingHours, day: e.target.value })}
              required
              className="border p-2 mr-4"
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <input
              type="time"
              value={newWorkingHours.startTime}
              onChange={(e) => setNewWorkingHours({ ...newWorkingHours, startTime: e.target.value })}
              required
              className="border p-2 mr-4"
            />
            <input
              type="time"
              value={newWorkingHours.endTime}
              onChange={(e) => setNewWorkingHours({ ...newWorkingHours, endTime: e.target.value })}
              required
              className="border p-2 mr-4"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded">Add Working Hours</button>
          </form>

          {/* Working Hours List */}
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">End Time</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workingHours.map((hours) => (
                <tr key={hours._id}>
                  <td className="border px-4 py-2">{hours.day}</td>
                  <td className="border px-4 py-2">{hours.startTime}</td>
                  <td className="border px-4 py-2">{hours.endTime}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDeleteWorkingHours(hours._id)}
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

export default WorkingHoursManagement;
