// controllers/holidayController.js
const Holiday = require('../models/Holiday');
const mongoose = require('mongoose');

// Add a new holiday (Admin only)
const addHoliday = async (req, res) => {
  const { date, reason } = req.body;

  try {
    const holiday = new Holiday({ date, reason });
    await holiday.save();
    res.status(201).json(holiday);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating holiday', error });
  }
};

// Get all holidays (Public)
const getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find({});
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching holidays', error });
  }
};

// Delete a holiday (Admin only)
const deleteHoliday = async (req, res) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Find and delete the holiday by ID
    const holiday = await Holiday.findByIdAndDelete(req.params.id);
    if (!holiday) {
      return res.status(404).json({ message: 'Holiday not found' });
    }

    // Send success response
    res.json({ message: 'Holiday deleted successfully' });
  } catch (error) {
    // Handle server errors
    console.error('Error deleting holiday:', error);
    res.status(500).json({ message: 'Server error deleting holiday', error });
  }
};


module.exports = {
  addHoliday,
  getHolidays,
  deleteHoliday,
};
