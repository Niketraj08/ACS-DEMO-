const Contact = require('../models/Contact');
const Blog = require('../models/Blog');
const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');
const Career = require('../models/Career');
const Testimonial = require('../models/Testimonial');
const Newsletter = require('../models/Newsletter');
const asyncHandler = require('../utils/asyncHandler');

exports.getStats = asyncHandler(async (req, res) => {
  const [contacts, blogs, services, projects, careers, testimonials, subscribers] = await Promise.all([
    Contact.countDocuments(),
    Blog.countDocuments(),
    Service.countDocuments(),
    Portfolio.countDocuments(),
    Career.countDocuments(),
    Testimonial.countDocuments(),
    Newsletter.countDocuments(),
  ]);

  const newContacts = await Contact.countDocuments({ status: 'new' });
  const recentContacts = await Contact.find().sort('-createdAt').limit(5);
  const recentBlogs = await Blog.find().sort('-createdAt').limit(5).select('title isPublished createdAt');

  const monthlyContacts = await Contact.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    success: true,
    data: {
      stats: { contacts, newContacts, blogs, services, projects, careers, testimonials, subscribers },
      recentContacts,
      recentBlogs,
      monthlyContacts,
    },
  });
});
