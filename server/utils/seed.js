require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Hero = require('../models/Hero');
const About = require('../models/About');
const Service = require('../models/Service');
const WhyChooseUs = require('../models/WhyChooseUs');
const Portfolio = require('../models/Portfolio');
const TechStack = require('../models/TechStack');
const Pricing = require('../models/Pricing');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const Footer = require('../models/Footer');
const WebsiteSettings = require('../models/WebsiteSettings');
const SEO = require('../models/SEO');
const Solution = require('../models/Solution');

const services = [
  { title: 'Website Development', shortDescription: 'Responsive, SEO-optimized websites that convert visitors into customers.', icon: 'FaGlobe', order: 1 },
  { title: 'Custom Software Development', shortDescription: 'Tailored software solutions built to match your unique business workflows.', icon: 'FaCode', order: 2 },
  { title: 'Mobile App Development', shortDescription: 'Native and cross-platform mobile apps for iOS and Android.', icon: 'FaMobileAlt', order: 3 },
  { title: 'AI Solutions', shortDescription: 'Intelligent automation, ML models, and AI-powered business tools.', icon: 'FaBrain', order: 4 },
  { title: 'Cloud Services', shortDescription: 'Scalable cloud migration, deployment, and infrastructure management.', icon: 'FaCloud', order: 5 },
  { title: 'UI/UX Design', shortDescription: 'User-centered design that delivers exceptional digital experiences.', icon: 'FaPalette', order: 6 },
  { title: 'Digital Marketing & SEO', shortDescription: 'Data-driven marketing strategies to grow your online presence.', icon: 'FaChartLine', order: 7 },
  { title: 'ERP & CRM Development', shortDescription: 'Enterprise resource planning and customer relationship systems.', icon: 'FaBuilding', order: 8 },
  { title: 'E-Commerce Development', shortDescription: 'Full-featured online stores with secure payment integration.', icon: 'FaShoppingCart', order: 9 },
  { title: 'IT Consulting', shortDescription: 'Strategic technology advisory to align IT with business goals.', icon: 'FaLightbulb', order: 10 },
  { title: 'Business Automation', shortDescription: 'Streamline operations with intelligent workflow automation.', icon: 'FaCogs', order: 11 },
  { title: 'Maintenance & Support', shortDescription: '24/7 monitoring, updates, and dedicated technical support.', icon: 'FaHeadset', order: 12 },
];

const seed = async () => {
  await connectDB();
  console.log('Seeding database...');

  await User.deleteMany();
  await User.create({
    name: 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@astracognix.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123456',
    role: 'admin',
  });

  await Hero.deleteMany();
  await Hero.create({
    headline: 'Transforming Ideas Into Digital Excellence',
    subheadline: 'Astra Cognix Solutions Pvt Ltd delivers innovative software, web, mobile, AI, cloud, and digital transformation solutions that empower businesses to scale faster.',
    primaryCta: 'Get Started',
    secondaryCta: 'Book Free Consultation',
    floatingCards: [
      { title: 'Projects', value: '150+', icon: 'projects' },
      { title: 'Clients', value: '100+', icon: 'clients' },
      { title: 'Experts', value: '25+', icon: 'experts' },
    ],
  });

  await About.deleteMany();
  await About.create({
    title: 'Who We Are',
    content: 'Astra Cognix Solutions Pvt Ltd is a next-generation technology company committed to delivering innovative digital solutions for startups, enterprises, and growing businesses.',
    mission: 'To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and digital transformation.',
    vision: 'To be the most trusted technology partner for businesses worldwide, known for innovation, quality, and exceptional service.',
    coreValues: [
      { title: 'Innovation', description: 'We embrace new technologies and creative approaches.', icon: 'FaRocket' },
      { title: 'Integrity', description: 'We build trust through transparency and ethical practices.', icon: 'FaShieldAlt' },
      { title: 'Excellence', description: 'We deliver superior quality in every project we undertake.', icon: 'FaStar' },
      { title: 'Collaboration', description: 'We work closely with clients as true technology partners.', icon: 'FaUsers' },
    ],
    highlights: [
      { title: 'End-to-End Solutions', description: 'From strategy to deployment and support.' },
      { title: 'Agile Methodology', description: 'Fast, iterative delivery with continuous feedback.' },
      { title: 'Global Standards', description: 'Enterprise-grade quality at competitive pricing.' },
    ],
    statistics: [
      { label: 'Projects Delivered', value: '150', suffix: '+' },
      { label: 'Happy Clients', value: '100', suffix: '+' },
      { label: 'Expert Developers', value: '25', suffix: '+' },
      { label: 'Client Satisfaction', value: '98', suffix: '%' },
    ],
  });

  await Service.deleteMany();
  await Service.insertMany(services);

  await WhyChooseUs.deleteMany();
  await WhyChooseUs.create({
    title: 'Why Choose Astra Cognix',
    subtitle: 'Your trusted partner for digital transformation',
    items: [
      { title: 'Experienced Team', description: 'Seasoned developers and consultants with diverse industry expertise.', icon: 'FaUserTie', order: 1 },
      { title: 'Innovative Solutions', description: 'Latest technologies including AI, cloud, and modern frameworks.', icon: 'FaLightbulb', order: 2 },
      { title: 'On-Time Delivery', description: 'Agile processes ensuring projects delivered on schedule.', icon: 'FaClock', order: 3 },
      { title: 'Affordable Pricing', description: 'Competitive rates without compromising on quality.', icon: 'FaDollarSign', order: 4 },
      { title: 'Dedicated Support', description: 'Round-the-clock support for all your technical needs.', icon: 'FaHeadset', order: 5 },
      { title: 'Secure Technology', description: 'Enterprise-grade security in every solution we build.', icon: 'FaLock', order: 6 },
    ],
  });

  await Portfolio.deleteMany();
  await Portfolio.insertMany([
    { title: 'Enterprise CRM Platform', category: 'CRM Systems', description: 'Custom CRM for sales automation and client management.', technologies: ['React', 'Node.js', 'MongoDB'], isFeatured: true, order: 1 },
    { title: 'E-Commerce Marketplace', category: 'E-Commerce', description: 'Multi-vendor marketplace with payment gateway integration.', technologies: ['Next.js', 'Stripe', 'PostgreSQL'], isFeatured: true, order: 2 },
    { title: 'Healthcare Mobile App', category: 'Mobile Apps', description: 'Patient management and telemedicine mobile application.', technologies: ['React Native', 'Firebase'], order: 3 },
    { title: 'Corporate Website', category: 'Business Websites', description: 'Premium corporate website with CMS integration.', technologies: ['React', 'Tailwind'], order: 4 },
  ]);

  await TechStack.deleteMany();
  await TechStack.create({
    title: 'Our Technology Stack',
    categories: [
      { name: 'Frontend', items: [{ name: 'React' }, { name: 'Next.js' }, { name: 'Angular' }, { name: 'Vue' }] },
      { name: 'Backend', items: [{ name: 'Node.js' }, { name: 'Express.js' }, { name: 'Java' }, { name: 'Python' }, { name: 'PHP' }, { name: '.NET' }] },
      { name: 'Database', items: [{ name: 'MongoDB' }, { name: 'PostgreSQL' }, { name: 'MySQL' }, { name: 'Firebase' }] },
      { name: 'Cloud', items: [{ name: 'AWS' }, { name: 'Azure' }, { name: 'Google Cloud' }] },
      { name: 'AI', items: [{ name: 'Machine Learning' }, { name: 'OpenAI API' }, { name: 'Automation' }] },
    ],
  });

  await Pricing.deleteMany();
  await Pricing.insertMany([
    { name: 'Starter', price: '₹29,999', period: '/project', description: 'Perfect for small businesses and startups', features: ['5 Pages Website', 'Responsive Design', 'Basic SEO', 'Contact Form', '1 Month Support'], order: 1 },
    { name: 'Professional', price: '₹79,999', period: '/project', description: 'Ideal for growing businesses', features: ['Custom Web Application', 'CMS Integration', 'Advanced SEO', 'Analytics Setup', '3 Months Support', 'Performance Optimization'], isPopular: true, order: 2 },
    { name: 'Enterprise', price: 'Custom', period: '', description: 'Tailored solutions for large organizations', features: ['Full-Stack Development', 'Cloud Infrastructure', 'AI Integration', 'Dedicated Team', '24/7 Support', 'SLA Guarantee'], order: 3 },
  ]);

  await Testimonial.deleteMany();
  await Testimonial.insertMany([
    { name: 'Rajesh Kumar', role: 'CEO', company: 'TechVentures India', content: 'Astra Cognix transformed our digital presence. Their team delivered beyond expectations with exceptional quality and support.', rating: 5, order: 1 },
    { name: 'Priya Sharma', role: 'CTO', company: 'InnovateLabs', content: 'Professional, reliable, and innovative. They built our entire ERP system on time and within budget.', rating: 5, order: 2 },
    { name: 'Amit Patel', role: 'Founder', company: 'ShopEase', content: 'Our e-commerce platform has seen 300% growth since launch. Highly recommend their development services.', rating: 5, order: 3 },
  ]);

  await FAQ.deleteMany();
  await FAQ.insertMany([
    { question: 'What services does Astra Cognix Solutions offer?', answer: 'We offer website development, custom software, mobile apps, AI solutions, cloud services, UI/UX design, digital marketing, ERP/CRM, e-commerce, IT consulting, automation, and maintenance support.', order: 1 },
    { question: 'How long does a typical project take?', answer: 'Project timelines vary based on scope. A standard website takes 2-4 weeks, while enterprise applications may take 3-6 months. We provide detailed timelines during consultation.', order: 2 },
    { question: 'Do you provide post-launch support?', answer: 'Yes, all our packages include support periods. We also offer extended maintenance plans with 24/7 monitoring and dedicated support teams.', order: 3 },
    { question: 'What is your pricing model?', answer: 'We offer flexible pricing including fixed-price projects, hourly rates, and dedicated team models. Contact us for a customized quote based on your requirements.', order: 4 },
    { question: 'Can you work with our existing team?', answer: 'Absolutely. We seamlessly integrate with in-house teams, providing augmentation, consulting, or full project ownership as needed.', order: 5 },
  ]);

  await Solution.deleteMany();
  await Solution.insertMany([
    { title: 'Digital Transformation', description: 'Modernize legacy systems and processes for the digital age.', icon: 'FaDigitalTachograph', order: 1 },
    { title: 'Enterprise Integration', description: 'Connect disparate systems into unified workflows.', icon: 'FaNetworkWired', order: 2 },
    { title: 'Data Analytics', description: 'Turn data into actionable business insights.', icon: 'FaChartBar', order: 3 },
    { title: 'Cybersecurity', description: 'Protect your digital assets with robust security solutions.', icon: 'FaShieldAlt', order: 4 },
  ]);

  await Footer.deleteMany();
  await Footer.create({
    companyDescription: 'Astra Cognix Solutions Pvt Ltd - Your trusted partner for innovative digital solutions.',
    address: 'India',
    phone: '+91 98765 43210',
    email: 'info@astracognix.com',
    quickLinks: [
      { label: 'Home', url: '/' },
      { label: 'About', url: '/about' },
      { label: 'Services', url: '/services' },
      { label: 'Contact', url: '/contact' },
    ],
    serviceLinks: [
      { label: 'Web Development', url: '/services' },
      { label: 'Mobile Apps', url: '/services' },
      { label: 'AI Solutions', url: '/services' },
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: '#', icon: 'FaLinkedin' },
      { platform: 'Twitter', url: '#', icon: 'FaTwitter' },
      { platform: 'Facebook', url: '#', icon: 'FaFacebook' },
      { platform: 'Instagram', url: '#', icon: 'FaInstagram' },
    ],
    copyright: `© ${new Date().getFullYear()} Astra Cognix Solutions Pvt Ltd. All rights reserved.`,
  });

  await WebsiteSettings.deleteMany();
  await WebsiteSettings.create({
    siteName: 'Astra Cognix Solutions Pvt Ltd',
    tagline: 'Transforming Ideas Into Digital Excellence',
    contactEmail: 'info@astracognix.com',
    contactPhone: '+91 98765 43210',
    address: 'India',
  });

  await SEO.deleteMany();
  await SEO.insertMany([
    { page: 'home', metaTitle: 'Astra Cognix Solutions | IT Company India', metaDescription: 'Premium IT services - web, mobile, AI, cloud solutions for businesses.' },
    { page: 'about', metaTitle: 'About Us | Astra Cognix Solutions', metaDescription: 'Learn about our mission, vision, and team.' },
    { page: 'services', metaTitle: 'IT Services | Astra Cognix Solutions', metaDescription: 'Comprehensive IT services for digital transformation.' },
    { page: 'contact', metaTitle: 'Contact Us | Astra Cognix Solutions', metaDescription: 'Get in touch for a free consultation.' },
  ]);

  console.log('Seed completed!');
  console.log('Admin:', process.env.ADMIN_EMAIL || 'admin@astracognix.com');
  console.log('Password:', process.env.ADMIN_PASSWORD || 'Admin@123456');
  process.exit(0);
};

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
