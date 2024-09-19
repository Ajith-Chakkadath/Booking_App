// src/pages/ManageUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
             Authorization: `Bearer ${storedUserInfo.token}`,
          },
        };

        const { data } = await axios.get('http://localhost:8080/api/admin/users', config);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo').token}`,
        },
      };
      await axios.delete(`/api/admin/user/${userId}`, config);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="p-4 bg-gray-100 mb-4 rounded-lg">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button
              onClick={() => deleteUser(user._id)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg mt-2"
            >
              Delete User
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
