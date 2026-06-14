const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: String,
    description: String,
    category: {
      type: String,
      enum: ['Business Websites', 'CRM Systems', 'ERP Solutions', 'Enterprise Software', 'Mobile Apps', 'E-Commerce'],
    },
    client: String,
    technologies: [String],
    images: [String],
    featuredImage: String,
    projectUrl: String,
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
