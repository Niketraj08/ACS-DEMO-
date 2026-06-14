const Career = require('../models/Career');
const asyncHandler = require('../utils/asyncHandler');
const createCrud = require('./crudFactory');
const crud = createCrud(Career);

exports.getAll = asyncHandler(async (req, res) => {
  const query = req.user ? {} : { isActive: true };
  const data = await Career.find(query).sort('-createdAt');
  res.json({ success: true, data });
});

exports.getOne = crud.getOne;
exports.create = crud.create;
exports.update = crud.update;
exports.remove = crud.remove;

exports.apply = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id);
  if (!career || !career.isActive) {
    return res.status(404).json({ success: false, message: 'Position not found' });
  }
  career.applications.push(req.body);
  await career.save();
  res.status(201).json({ success: true, message: 'Application submitted successfully' });
});

exports.getApplications = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id);
  if (!career) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: career.applications });
});

exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id);
  if (!career) return res.status(404).json({ success: false, message: 'Not found' });
  const app = career.applications.id(req.params.appId);
  if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
  app.status = req.body.status;
  await career.save();
  res.json({ success: true, data: app });
});
