const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const auth = require('../controllers/authController');
const dashboard = require('../controllers/dashboardController');
const uploadCtrl = require('../controllers/uploadController');
const contact = require('../controllers/contactController');
const blog = require('../controllers/blogController');
const career = require('../controllers/careerController');
const newsletter = require('../controllers/newsletterController');
const createCrud = require('../controllers/crudFactory');

const Hero = require('../models/Hero');
const About = require('../models/About');
const Service = require('../models/Service');
const Solution = require('../models/Solution');
const WhyChooseUs = require('../models/WhyChooseUs');
const Portfolio = require('../models/Portfolio');
const TechStack = require('../models/TechStack');
const Pricing = require('../models/Pricing');
const Testimonial = require('../models/Testimonial');
const ClientLogo = require('../models/ClientLogo');
const FAQ = require('../models/FAQ');
const Footer = require('../models/Footer');
const WebsiteSettings = require('../models/WebsiteSettings');
const SEO = require('../models/SEO');

const router = express.Router();
const admin = [protect, authorize('admin', 'editor')];
const adminOnly = [protect, authorize('admin')];

const makeRoutes = (path, Model, opts = {}) => {
  const ctrl = createCrud(Model, opts);
  const publicCtrl = createCrud(Model, { ...opts, publicFilter: { isActive: true } });
  router.get(`/public/${path}`, publicCtrl.getAll);
  if (opts.singleton) {
    router.get(`/public/${path}/settings`, ctrl.getSingleton);
    router.put(`/${path}`, ...admin, ctrl.updateSingleton);
  } else {
    router.get(`/${path}/:id`, ...admin, ctrl.getOne);
    router.post(`/${path}`, ...admin, ctrl.create);
    router.put(`/${path}/:id`, ...admin, ctrl.update);
    router.delete(`/${path}/:id`, ...admin, ctrl.remove);
  }
};

// Auth
router.post('/auth/login', auth.login);
router.post('/auth/forgot-password', auth.forgotPassword);
router.put('/auth/reset-password/:token', auth.resetPassword);
router.get('/auth/me', protect, auth.getMe);
router.put('/auth/profile', protect, auth.updateProfile);
router.put('/auth/password', protect, auth.changePassword);

// Users
router.get('/users', ...adminOnly, auth.getUsers);
router.post('/users', ...adminOnly, auth.createUser);
router.put('/users/:id', ...adminOnly, auth.updateUser);
router.delete('/users/:id', ...adminOnly, auth.deleteUser);

// Dashboard & Upload
router.get('/dashboard/stats', ...admin, dashboard.getStats);
router.post('/upload', ...admin, upload.single('image'), uploadCtrl.uploadImage);

// Contact & Newsletter
router.post('/public/contact', contact.submit);
router.get('/contacts', ...admin, contact.getAll);
router.get('/contacts/:id', ...admin, contact.getOne);
router.put('/contacts/:id', ...admin, contact.updateStatus);
router.delete('/contacts/:id', ...admin, contact.remove);

router.post('/public/newsletter', newsletter.subscribe);
router.get('/newsletter', ...admin, newsletter.getAll);
router.delete('/newsletter/:id', ...admin, newsletter.remove);

// Blog
router.get('/public/blogs', blog.getAll);
router.get('/public/blogs/:slug', blog.getBySlug);
router.get('/blogs', protect, blog.getAll);
router.get('/blogs/:id', ...admin, blog.getOne);
router.post('/blogs', ...admin, blog.create);
router.put('/blogs/:id', ...admin, blog.update);
router.delete('/blogs/:id', ...admin, blog.remove);

// Careers
router.get('/public/careers', career.getAll);
router.post('/public/careers/:id/apply', career.apply);
router.get('/careers', ...admin, career.getAll);
router.get('/careers/:id', ...admin, career.getOne);
router.post('/careers', ...admin, career.create);
router.put('/careers/:id', ...admin, career.update);
router.delete('/careers/:id', ...admin, career.remove);
router.get('/careers/:id/applications', ...admin, career.getApplications);
router.put('/careers/:id/applications/:appId', ...admin, career.updateApplicationStatus);

// Singleton CMS
const heroCtrl = createCrud(Hero);
router.get('/public/hero', heroCtrl.getSingleton);
router.put('/hero', ...admin, heroCtrl.updateSingleton);

const aboutCtrl = createCrud(About);
router.get('/public/about', aboutCtrl.getSingleton);
router.put('/about', ...admin, aboutCtrl.updateSingleton);

const whyCtrl = createCrud(WhyChooseUs);
router.get('/public/why-choose-us', whyCtrl.getSingleton);
router.put('/why-choose-us', ...admin, whyCtrl.updateSingleton);

const techCtrl = createCrud(TechStack);
router.get('/public/tech-stack', techCtrl.getSingleton);
router.put('/tech-stack', ...admin, techCtrl.updateSingleton);

const footerCtrl = createCrud(Footer);
router.get('/public/footer', footerCtrl.getSingleton);
router.put('/footer', ...admin, footerCtrl.updateSingleton);

const settingsCtrl = createCrud(WebsiteSettings);
router.get('/public/settings', settingsCtrl.getSingleton);
router.put('/settings', ...admin, settingsCtrl.updateSingleton);

// CRUD resources
makeRoutes('services', Service, { searchFields: ['title', 'description'], sortBy: 'order' });
makeRoutes('solutions', Solution, { searchFields: ['title'], sortBy: 'order' });
makeRoutes('portfolio', Portfolio, { searchFields: ['title', 'client'] });
makeRoutes('pricing', Pricing, { sortBy: 'order' });
makeRoutes('testimonials', Testimonial, { sortBy: 'order' });
makeRoutes('client-logos', ClientLogo, { sortBy: 'order' });
makeRoutes('faqs', FAQ, { sortBy: 'order' });

const seoCtrl = createCrud(SEO, { searchFields: ['page'] });
router.get('/public/seo/:page', async (req, res, next) => {
  try {
    const seo = await SEO.findOne({ page: req.params.page });
    res.json({ success: true, data: seo });
  } catch (e) {
    next(e);
  }
});
router.get('/seo', ...admin, seoCtrl.getAll);
router.post('/seo', ...admin, seoCtrl.create);
router.put('/seo/:id', ...admin, seoCtrl.update);
router.delete('/seo/:id', ...admin, seoCtrl.remove);

// Admin list routes
router.get('/services', ...admin, createCrud(Service).getAll);
router.get('/solutions', ...admin, createCrud(Solution).getAll);
router.get('/portfolio', ...admin, createCrud(Portfolio).getAll);
router.get('/pricing', ...admin, createCrud(Pricing).getAll);
router.get('/testimonials', ...admin, createCrud(Testimonial).getAll);
router.get('/client-logos', ...admin, createCrud(ClientLogo).getAll);
router.get('/faqs', ...admin, createCrud(FAQ).getAll);

module.exports = router;
