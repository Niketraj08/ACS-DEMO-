const Contact = require('../models/Contact');
const asyncHandler = require('../utils/asyncHandler');
const { sendEmail } = require('../utils/email');
const createCrud = require('./crudFactory');
const crud = createCrud(Contact, { searchFields: ['fullName', 'email', 'companyName'] });

exports.getAll = crud.getAll;
exports.getOne = crud.getOne;
exports.remove = crud.remove;

exports.submit = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  await sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `New Inquiry from ${contact.fullName}`,
    html: `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${contact.fullName}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${contact.companyName || 'N/A'}</p>
      <p><strong>Service:</strong> ${contact.serviceRequirement || 'N/A'}</p>
      <p><strong>Message:</strong> ${contact.message}</p>
    `,
  });
  res.status(201).json({ success: true, message: 'Thank you! We will contact you soon.', data: contact });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, adminNotes: req.body.adminNotes },
    { new: true }
  );
  if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: contact });
});
