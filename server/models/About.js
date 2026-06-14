const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Who We Are' },
    content: String,
    mission: String,
    vision: String,
    coreValues: [{ title: String, description: String, icon: String }],
    highlights: [{ title: String, description: String }],
    statistics: [{ label: String, value: String, suffix: String }],
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
