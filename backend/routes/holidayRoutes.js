// routes/holidayRoutes.js
const express = require('express');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { addHoliday, getHolidays, deleteHoliday } = require('../controllers/holidayController');

const router = express.Router();

// Route to add a holiday (Admin only)
router.post('/', protect, admin, addHoliday);

// Route to get all holidays (Public)
router.get('/', getHolidays);

// Route to delete a holiday (Admin only)
router.delete('/:id', protect, admin, deleteHoliday);

module.exports = router;
