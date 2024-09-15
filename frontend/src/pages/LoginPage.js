import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      localStorage.setItem('userInfo', JSON.stringify(response.data));  // Store user info in local storage
      setMessage('Login successful!');
      
      // Redirect to the booking page after successful login
      navigate('/booking');  
    } catch (error) {
      setMessage('Login failed, please try again.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      {message && <p className="text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
        />
        <button className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700" type="submit">
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        Don't have an account? <Link to="/signup" className="text-blue-500">Signup here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
