// routes/workingHoursRoutes.js
const express = require('express');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { setWorkingHours, getWorkingHours, deleteWorkingHours } = require('../controllers/workingHoursController');

const router = express.Router();

// Route to set working hours (Admin only)
router.post('/', protect, admin, setWorkingHours);

// Route to get all working hours (Public)
router.get('/', getWorkingHours);

// Route to delete working hours for a specific day (Admin only)
router.delete('/:id', protect, admin, deleteWorkingHours);

module.exports = router;
