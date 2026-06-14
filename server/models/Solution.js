const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: String,
    description: String,
    icon: String,
    image: String,
    features: [String],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Solution', solutionSchema);
