const mongoose = require('mongoose');

const clientLogoSchema = new mongoose.Schema(
  {
    name: String,
    logo: { type: String, required: true },
    website: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClientLogo', clientLogoSchema);
