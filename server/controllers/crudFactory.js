const asyncHandler = require('../utils/asyncHandler');

const createCrudController = (Model, options = {}) => {
  const { searchFields = ['title', 'name'], sortBy = '-createdAt', publicFilter = {} } = options;

  return {
    getAll: asyncHandler(async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 100;
      const skip = (page - 1) * limit;
      let query = { ...publicFilter };

      if (req.query.isActive !== undefined) query.isActive = req.query.isActive === 'true';
      if (req.query.isPublished !== undefined) query.isPublished = req.query.isPublished === 'true';
      if (req.query.category) query.category = req.query.category;
      if (req.query.search && searchFields.length) {
        query.$or = searchFields.map((f) => ({ [f]: { $regex: req.query.search, $options: 'i' } }));
      }

      const [data, total] = await Promise.all([
        Model.find(query).sort(sortBy).skip(skip).limit(limit),
        Model.countDocuments(query),
      ]);

      res.json({ success: true, data, total, page, pages: Math.ceil(total / limit) });
    }),

    getOne: asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: item });
    }),

    getSingleton: asyncHandler(async (req, res) => {
      let item = await Model.findOne();
      if (!item) item = await Model.create({});
      res.json({ success: true, data: item });
    }),

    create: asyncHandler(async (req, res) => {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    }),

    update: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: item });
    }),

    updateSingleton: asyncHandler(async (req, res) => {
      let item = await Model.findOne();
      if (!item) item = await Model.create(req.body);
      else item = await Model.findByIdAndUpdate(item._id, req.body, { new: true, runValidators: true });
      res.json({ success: true, data: item });
    }),

    remove: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, message: 'Deleted successfully' });
    }),
  };
};

module.exports = createCrudController;
