const express = require('express');
const { getUserBookings, createBooking, cancelBooking } = require('../controllers/bookingController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// POST route to create a new booking (Protected)
router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.delete('/:id', protect, cancelBooking);


module.exports = router;
