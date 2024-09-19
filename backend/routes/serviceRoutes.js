// routes/serviceRoutes.js
const express = require('express');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { createService, getServices, updateService, deleteService } = require('../controllers/serviceController');

const router = express.Router();

// Route to create a new service (Admin only)
router.post('/', protect, admin, createService);

// Route to get all services (Public)
router.get('/', getServices);

// Route to update a service (Admin only)
router.put('/:id', protect, admin, updateService);

// Route to delete a service (Admin only)
router.delete('/:id', protect, admin, deleteService);

module.exports = router;
