const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get a single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Create a new listing
router.post('/', async (req, res) => {
  try {
    const { title, description, location, price, image } = req.body;
    if (!title || !description || !location || !price || !image) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newListing = new Listing({ title, description, location, price, image });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
