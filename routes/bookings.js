const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');



// POST /api/bookings — Create a booking
router.post('/', async (req, res) => {
  try {
    console.log('Received booking request body:', req.body);
    const { listing, userId, startDate, endDate } = req.body;

    if (!listing || !userId || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const listingDoc = await Listing.findById(listing);
    if (!listingDoc) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const newBooking = new Booking({
      listing,
      userId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });

  } catch (err) {
    console.error('❌ Booking Error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// GET /api/bookings/:userId — Get bookings for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId }).populate('listing');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('❌ Fetching Bookings Error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

module.exports = router;
