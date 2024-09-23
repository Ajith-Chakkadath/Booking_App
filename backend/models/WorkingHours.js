// models/WorkingHours.js
const mongoose = require('mongoose');

const workingHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true, // e.g., 'Monday', 'Tuesday', etc.
  },
  startTime: {
    type: String, // e.g., '09:00'
    required: true,
  },
  endTime: {
    type: String, // e.g., '17:00'
    required: true,
  },
});

module.exports = mongoose.model('WorkingHours', workingHoursSchema);
