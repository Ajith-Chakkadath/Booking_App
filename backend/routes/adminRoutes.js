// routes/adminRoutes.js
const express = require('express');
const { getUsers, createAdmin, getAllBookings, getAllServices, deleteUser } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Admin routes
router.get('/users', protect, admin, getUsers);            // Get all users
router.post('/createAdmin', protect, admin, createAdmin);  // Create a new admin
router.get('/bookings', protect, admin, getAllBookings);   // Get all bookings
router.get('/services', protect, admin, getAllServices);   // Get all services
router.delete('/user/:id', protect, admin, deleteUser);    // Delete a user

module.exports = router;
