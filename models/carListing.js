const mongoose = require('mongoose');

const carListingSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  model: String,
  make: String,
  year: Number,
  mileage: Number,
  features: [String],
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  pricing: {
    perDay: Number,
  },
  availability: [{ startDate: Date, endDate: Date }],
  image: String, // Store a single Base64 image string
  createdAt: { type: Date, default: Date.now }
});

carListingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('CarListing', carListingSchema);
