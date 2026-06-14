const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true },
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    canonicalUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('SEO', seoSchema);
