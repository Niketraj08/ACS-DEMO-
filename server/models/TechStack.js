const mongoose = require('mongoose');

const techStackSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Technology Stack' },
    categories: [{
      name: String,
      items: [{ name: String, icon: String }],
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('TechStack', techStackSchema);
