const Newsletter = require('../models/Newsletter');
const asyncHandler = require('../utils/asyncHandler');

exports.subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });
  const existing = await Newsletter.findOne({ email });
  if (existing) {
    return res.json({ success: true, message: 'Already subscribed' });
  }
  await Newsletter.create({ email });
  res.status(201).json({ success: true, message: 'Subscribed successfully' });
});

exports.getAll = asyncHandler(async (req, res) => {
  const data = await Newsletter.find().sort('-createdAt');
  res.json({ success: true, data });
});

exports.remove = asyncHandler(async (req, res) => {
  await Newsletter.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Unsubscribed' });
});
