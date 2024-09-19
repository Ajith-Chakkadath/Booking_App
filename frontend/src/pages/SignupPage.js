import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');  // Message state for success or error
  const [success, setSuccess] = useState(false);  // Track signup success
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
      await axios.post('http://localhost:8080/api/auth/register', formData);
      setMessage('Successfully signed up!');  // Show success message
      setSuccess(true);  // Mark signup as successful
      setTimeout(() => {
        navigate('/login');  // Redirect to login page after 3 seconds
      }, 3000);
    } catch (error) {
      setMessage('Registration failed, please try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

      {/* Show success or error message */}
      {message && (
        <div className={`text-center mb-4 ${success ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
        />
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
          Sign Up
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
      </p>
    </div>
  );
};

export default SignupPage;
