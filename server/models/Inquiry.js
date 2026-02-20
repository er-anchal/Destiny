const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String }, // Optional (some forms don't have it)
  phone: { type: String, required: true },
  message: { type: String },
  source: { type: String, default: 'Website' }, // ✅ Tracks where it came from
  status: { type: String, default: 'New' },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);