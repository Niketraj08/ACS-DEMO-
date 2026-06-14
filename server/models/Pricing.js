const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: String,
    period: { type: String, default: '/month' },
    description: String,
    features: [String],
    isPopular: { type: Boolean, default: false },
    ctaText: { type: String, default: 'Get Started' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pricing', pricingSchema);
