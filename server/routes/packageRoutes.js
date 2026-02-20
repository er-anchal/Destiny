const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all packages (with filtering)
router.get('/', async (req, res) => {
  try {
    const { category, isFeatured } = req.query;
    let query = {};
    if (category) query.category = category;
    if (isFeatured) query.isFeatured = isFeatured === 'true';

    const packages = await Package.find(query);
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single package by ID
router.get('/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new package (Admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a package (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;