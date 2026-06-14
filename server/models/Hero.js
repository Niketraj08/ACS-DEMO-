const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    headline: { type: String, default: 'Transforming Ideas Into Digital Excellence' },
    subheadline: { type: String },
    primaryCta: { type: String, default: 'Get Started' },
    secondaryCta: { type: String, default: 'Book Free Consultation' },
    backgroundImage: String,
    illustration: String,
    floatingCards: [{ title: String, value: String, icon: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hero', heroSchema);
