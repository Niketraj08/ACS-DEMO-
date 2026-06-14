const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema(
  {
    companyDescription: String,
    address: String,
    phone: String,
    email: String,
    quickLinks: [{ label: String, url: String }],
    serviceLinks: [{ label: String, url: String }],
    socialLinks: [{ platform: String, url: String, icon: String }],
    copyright: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Footer', footerSchema);
