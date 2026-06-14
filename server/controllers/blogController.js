const Blog = require('../models/Blog');
const slugify = require('../utils/slugify');
const asyncHandler = require('../utils/asyncHandler');
const createCrud = require('./crudFactory');
const crud = createCrud(Blog, { searchFields: ['title', 'excerpt', 'category'] });

exports.getAll = asyncHandler(async (req, res) => {
  const isAdmin = req.user;
  let query = isAdmin ? {} : { isPublished: true };
  if (req.query.category) query.category = req.query.category;
  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { excerpt: { $regex: req.query.search, $options: 'i' } },
    ];
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Blog.find(query).populate('author', 'name').sort('-createdAt').skip(skip).limit(limit),
    Blog.countDocuments(query),
  ]);
  res.json({ success: true, data, total, page, pages: Math.ceil(total / limit) });
});

exports.getBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true }).populate('author', 'name');
  if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
  blog.views += 1;
  await blog.save();
  res.json({ success: true, data: blog });
});

exports.getOne = crud.getOne;
exports.remove = crud.remove;

exports.create = asyncHandler(async (req, res) => {
  const body = { ...req.body, author: req.user._id };
  if (body.title && !body.slug) body.slug = slugify(body.title);
  if (body.isPublished) body.publishedAt = new Date();
  const blog = await Blog.create(body);
  res.status(201).json({ success: true, data: blog });
});

exports.update = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (body.title && !body.slug) body.slug = slugify(body.title);
  if (body.isPublished) body.publishedAt = body.publishedAt || new Date();
  const blog = await Blog.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
  if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: blog });
});
