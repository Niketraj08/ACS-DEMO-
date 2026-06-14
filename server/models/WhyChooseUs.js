const mongoose = require('mongoose');

const whyChooseUsSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Why Choose Us' },
    subtitle: String,
    items: [{ title: String, description: String, icon: String, order: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('WhyChooseUs', whyChooseUsSchema);
