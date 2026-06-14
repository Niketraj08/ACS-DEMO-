const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: String,
    location: String,
    type: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], default: 'Full-time' },
    description: String,
    requirements: [String],
    responsibilities: [String],
    salary: String,
    isActive: { type: Boolean, default: true },
    applications: [{
      name: String,
      email: String,
      phone: String,
      resume: String,
      coverLetter: String,
      status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' },
      appliedAt: { type: Date, default: Date.now },
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
