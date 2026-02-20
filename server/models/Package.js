const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true }, 
});

const policySchema = new mongoose.Schema({
  title: { type: String, required: true },
  rules: [{ type: String }]
});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // Categories: 'international', 'india', 'honeymoon', 'deal', 'flipcard-india', 'flipcard-intl', 'honeymoon-dest'
  category: { type: String, required: true }, 
  location: { type: String },
  duration: { type: String }, 
  price: { type: String, required: true },
  image: { type: String, required: true },    
  backImage: { type: String },                // Specifically for Flipcards
  description: { type: String },
  isFeatured: { type: Boolean, default: false }, 
  
  itinerary: [daySchema],
  policies: [policySchema],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  gallery: [{ type: String }],
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);