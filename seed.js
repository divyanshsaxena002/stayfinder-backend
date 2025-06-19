const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Listing = require('./models/Listing');

dotenv.config();

const listings = [
  {
    title: "Cozy Beachfront Villa",
    location: "Goa",
    price: 2500,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Relax in this peaceful villa with direct beach access and great sunsets."
  },
  {
    title: "Modern City Apartment",
    location: "Bangalore",
    price: 1800,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    description: "A centrally located apartment with all modern amenities and fast Wi-Fi."
  },
  {
    title: "Mountain Cabin Retreat",
    location: "Manali",
    price: 2200,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
    description: "Escape to this wooden cabin surrounded by pine trees and snow-capped peaks."
  },
  {
    title: "Snooze & Snore 2",
    location: "Goa, India",
    price: 8000,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    description: "A peaceful place to snooze and snore in Goa."
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("MongoDB connected...");
  await Listing.deleteMany(); // optional: clear existing listings
  await Listing.insertMany(listings);
  console.log("Listings inserted!");
  process.exit();
})
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});
