const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const connectDB = require('./config/db');  // Import the MongoDB connection
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const holidayRoutes = require('./routes/holidayRoutes')
const workingHoursRoutes = require('./routes/workingHoursRoutes')

// Load environment variables
dotenv.config(); 

// App initialization
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();  // Call the connection function from db.js

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes)
app.use('/api/services',serviceRoutes)
app.use('/api/holidays',holidayRoutes)
app.use('/api/working-hours',workingHoursRoutes)

// Test route
app.get('/', (req, res) => {
  res.send('Salon booking backend running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
