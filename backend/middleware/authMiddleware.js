const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header is present and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token with the secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the decoded ID (stored in the token) and attach the user to the request object
      req.user = await User.findById(decoded.id).select('-password'); // Exclude the password

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If no token is provided in the header, return unauthorized
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
