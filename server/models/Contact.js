const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    companyName: String,
    serviceRequirement: String,
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'replied', 'closed'], default: 'new' },
    adminNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
