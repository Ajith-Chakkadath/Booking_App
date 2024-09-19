const Booking = require('../models/Booking');



// Handle booking creation
const createBooking = async (req, res) => {
  const { service, date, time } = req.body;

  try {
    // Check if the slot is already booked
    const existingBooking = await Booking.findOne({ service, date, time });
    if (existingBooking) {
      return res.status(400).json({ message: 'This time slot is already booked. Please choose a different time.' });
    }

    // Create a new booking associated with the logged-in user
    const newBooking = new Booking({
      user: req.user._id, // Associate booking with the user
      service,
      date,
      time,
    });

    // Save the booking to the database
    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure the user can only cancel their own bookings
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to cancel this booking' });
    }

    await booking.remove();
    res.json({ message: 'Booking canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error canceling booking' });
  }
};


module.exports = {
  createBooking,getUserBookings,cancelBooking
};

