// controllers/workingHoursController.js
const WorkingHours = require('../models/WorkingHours');

const mongoose = require('mongoose');

// Set working hours for a day (Admin only)
const setWorkingHours = async (req, res) => {
  const { day, startTime, endTime } = req.body;

  try {
    const workingHours = new WorkingHours({ day, startTime, endTime });
    await workingHours.save();
    res.status(201).json(workingHours);
  } catch (error) {
    res.status(500).json({ message: 'Server error setting working hours', error });
  }
};

// Get all working hours (Public)
const getWorkingHours = async (req, res) => {
  try {
    const workingHours = await WorkingHours.find({});
    res.json(workingHours);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching working hours', error });
  }
};


const deleteWorkingHours = async (req, res) => {
  console.log(req.params.id);
  try {
    // Ensure the id is valid before proceeding
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Find and delete the working hours by the provided id
    const workingHours = await WorkingHours.findByIdAndDelete(req.params.id); // Correct usage
    if (!workingHours) {
      return res.status(404).json({ message: 'Working hours not found' });
    }

    res.json({ message: 'Working hours deleted successfully' });
  } catch (error) {
    // Handle server error
    console.error('Error deleting working hours:', error); // Log the error to troubleshoot
    res.status(500).json({ message: 'Server error deleting working hours', error });
  }
};


module.exports = {
  setWorkingHours,
  getWorkingHours,
  deleteWorkingHours,
};
