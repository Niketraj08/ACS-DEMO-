const asyncHandler = require('../utils/asyncHandler');
const { uploadToCloudinary } = require('../middleware/upload');

exports.uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  const url = await uploadToCloudinary(req.file.path);
  res.json({ success: true, url });
});
