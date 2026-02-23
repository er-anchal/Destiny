// server/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  packageTitle: { type: String, required: true },
  amount: { type: Number, required: true },
  travelDate: { type: String, required: true },
  travelers: { type: Number, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String, required: true },
  status: { type: String, default: 'Success' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);