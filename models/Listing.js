const mongoose = require('mongoose');


const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x200',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Listing', ListingSchema);
