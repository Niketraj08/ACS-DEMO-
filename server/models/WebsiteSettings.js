const mongoose = require('mongoose');

const websiteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Astra Cognix Solutions Pvt Ltd' },
    tagline: String,
    logo: String,
    favicon: String,
    primaryColor: { type: String, default: '#0f2744' },
    secondaryColor: { type: String, default: '#1e40af' },
    contactEmail: String,
    contactPhone: String,
    address: String,
    socialLinks: [{ platform: String, url: String }],
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WebsiteSettings', websiteSettingsSchema);
