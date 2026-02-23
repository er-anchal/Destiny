const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/customers', protect, admin, async (req, res) => {
  try {
    const customers = await User.find({ isAdmin: false }).select('-password').lean();
    const bookings = await Booking.find({ status: 'Success' }).lean();
    
    const customersWithBookings = customers.map(customer => {
      const userBookings = bookings.filter(b => b.user.toString() === customer._id.toString());
      return { ...customer, bookings: userBookings };
    });

    res.json(customersWithBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;