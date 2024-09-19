const express = require('express');
const { registerUser, loginUser, getUserProfile,updateUserProfile } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route
router.get('/profile', protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);


module.exports = router;
