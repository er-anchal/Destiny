const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect, admin } = require('../middleware/authMiddleware');

// POST /api/inquiries
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, source } = req.body;
    
    const newInquiry = await Inquiry.create({ 
      name, 
      email: email || 'Not Provided', 
      phone, 
      message: message || 'No message',
      source: source || 'General'
    });
    
    res.status(201).json({ message: 'Inquiry sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET /api/inquiries (Admin)
router.get('/', protect, admin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/inquiries/:id (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;