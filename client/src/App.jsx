import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import PageLoader from './components/ui/PageLoader';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import { adminApi } from './api';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import PortfolioPage from './pages/PortfolioPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

const Login = lazy(() => import('./admin/pages/Login'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const HeroManage = lazy(() => import('./admin/pages/HeroManage'));
const AboutManage = lazy(() => import('./admin/pages/AboutManage'));
const ServicesManage = lazy(() => import('./admin/pages/ServicesManage'));
const ContactsManage = lazy(() => import('./admin/pages/ContactsManage'));
const BlogManage = lazy(() => import('./admin/pages/BlogManage'));
const SettingsManage = lazy(() => import('./admin/pages/SettingsManage'));
const GenericCrud = lazy(() => import('./admin/pages/GenericCrud'));
const SingletonManage = lazy(() => import('./admin/pages/SingletonManage'));

const portfolioFields = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'category', label: 'Category', type: 'select', options: ['Business Websites', 'CRM Systems', 'ERP Solutions', 'Enterprise Software', 'Mobile Apps', 'E-Commerce'] },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'client', label: 'Client', type: 'text' },
  { name: 'featuredImage', label: 'Image', type: 'image' },
  { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
  { name: 'order', label: 'Order', type: 'number' },
];

const testimonialFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'role', label: 'Role', type: 'text' },
  { name: 'company', label: 'Company', type: 'text' },
  { name: 'content', label: 'Review', type: 'textarea' },
  { name: 'rating', label: 'Rating', type: 'number' },
  { name: 'image', label: 'Photo', type: 'image' },
  { name: 'order', label: 'Order', type: 'number' },
];

const pricingFields = [
  { name: 'name', label: 'Plan Name', type: 'text' },
  { name: 'price', label: 'Price', type: 'text' },
  { name: 'period', label: 'Period', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'isPopular', label: 'Popular', type: 'checkbox' },
  { name: 'order', label: 'Order', type: 'number' },
];

const faqFields = [
  { name: 'question', label: 'Question', type: 'text' },
  { name: 'answer', label: 'Answer', type: 'textarea' },
  { name: 'order', label: 'Order', type: 'number' },
];

const careerFields = [
  { name: 'title', label: 'Job Title', type: 'text' },
  { name: 'department', label: 'Department', type: 'text' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'type', label: 'Type', type: 'select', options: ['Full-time', 'Part-time', 'Internship', 'Contract'] },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'isActive', label: 'Active', type: 'checkbox' },
];

const logoFields = [
  { name: 'name', label: 'Company Name', type: 'text' },
  { name: 'logo', label: 'Logo', type: 'image' },
  { name: 'website', label: 'Website', type: 'text' },
  { name: 'order', label: 'Order', type: 'number' },
];

const solutionFields = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'icon', label: 'Icon', type: 'text' },
  { name: 'order', label: 'Order', type: 'number' },
];

const seoFields = [
  { name: 'page', label: 'Page', type: 'text' },
  { name: 'metaTitle', label: 'Meta Title', type: 'text' },
  { name: 'metaDescription', label: 'Meta Description', type: 'textarea' },
];

function AdminSuspense({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster position="top-right" />
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="solutions" element={<SolutionsPage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
                <Route path="careers" element={<CareersPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogDetailPage />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>

              <Route path="/admin/login" element={<AdminSuspense><Login /></AdminSuspense>} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminSuspense><Dashboard /></AdminSuspense>} />
                <Route path="hero" element={<AdminSuspense><HeroManage /></AdminSuspense>} />
                <Route path="about" element={<AdminSuspense><AboutManage /></AdminSuspense>} />
                <Route path="services" element={<AdminSuspense><ServicesManage /></AdminSuspense>} />
                <Route path="contacts" element={<AdminSuspense><ContactsManage /></AdminSuspense>} />
                <Route path="blogs" element={<AdminSuspense><BlogManage /></AdminSuspense>} />
                <Route path="settings" element={<AdminSuspense><SettingsManage /></AdminSuspense>} />
                <Route path="why-choose-us" element={<AdminSuspense><SingletonManage title="Why Choose Us" fetchFn={adminApi.whyChooseUs} updateFn={adminApi.updateWhyChooseUs} /></AdminSuspense>} />
                <Route path="tech-stack" element={<AdminSuspense><SingletonManage title="Tech Stack" fetchFn={adminApi.techStack} updateFn={adminApi.updateTechStack} /></AdminSuspense>} />
                <Route path="portfolio" element={<AdminSuspense><GenericCrud title="Project" api={{ list: adminApi.portfolio, create: adminApi.createPortfolio, update: adminApi.updatePortfolio, remove: adminApi.deletePortfolio }} fields={portfolioFields} emptyItem={{ title: '', category: 'Business Websites', description: '', order: 0, isFeatured: false }} columns={[{ key: 'title', label: 'Title' }, { key: 'category', label: 'Category' }]} /></AdminSuspense>} />
                <Route path="testimonials" element={<AdminSuspense><GenericCrud title="Testimonial" api={{ list: adminApi.testimonials, create: adminApi.createTestimonial, update: adminApi.updateTestimonial, remove: adminApi.deleteTestimonial }} fields={testimonialFields} emptyItem={{ name: '', content: '', rating: 5, order: 0 }} columns={[{ key: 'name', label: 'Name' }, { key: 'company', label: 'Company' }]} /></AdminSuspense>} />
                <Route path="pricing" element={<AdminSuspense><GenericCrud title="Plan" api={{ list: adminApi.pricing, create: adminApi.createPricing, update: adminApi.updatePricing, remove: adminApi.deletePricing }} fields={pricingFields} emptyItem={{ name: '', price: '', period: '/project', order: 0 }} columns={[{ key: 'name', label: 'Plan' }, { key: 'price', label: 'Price' }]} /></AdminSuspense>} />
                <Route path="faqs" element={<AdminSuspense><GenericCrud title="FAQ" api={{ list: adminApi.faqs, create: adminApi.createFaq, update: adminApi.updateFaq, remove: adminApi.deleteFaq }} fields={faqFields} emptyItem={{ question: '', answer: '', order: 0 }} columns={[{ key: 'question', label: 'Question' }]} /></AdminSuspense>} />
                <Route path="careers" element={<AdminSuspense><GenericCrud title="Job" api={{ list: adminApi.careers, create: adminApi.createCareer, update: adminApi.updateCareer, remove: adminApi.deleteCareer }} fields={careerFields} emptyItem={{ title: '', type: 'Full-time', isActive: true }} columns={[{ key: 'title', label: 'Title' }, { key: 'type', label: 'Type' }]} /></AdminSuspense>} />
                <Route path="client-logos" element={<AdminSuspense><GenericCrud title="Logo" api={{ list: adminApi.clientLogos, create: adminApi.createLogo, update: adminApi.updateLogo, remove: adminApi.deleteLogo }} fields={logoFields} emptyItem={{ name: '', logo: '', order: 0 }} columns={[{ key: 'name', label: 'Company' }]} /></AdminSuspense>} />
                <Route path="solutions" element={<AdminSuspense><GenericCrud title="Solution" api={{ list: adminApi.solutions, create: adminApi.createSolution, update: adminApi.updateSolution, remove: adminApi.deleteSolution }} fields={solutionFields} emptyItem={{ title: '', icon: 'FaCode', order: 0 }} columns={[{ key: 'title', label: 'Title' }]} /></AdminSuspense>} />
                <Route path="seo" element={<AdminSuspense><GenericCrud title="SEO" api={{ list: adminApi.seo, create: adminApi.createSeo, update: adminApi.updateSeo, remove: adminApi.deleteSeo }} fields={seoFields} emptyItem={{ page: '', metaTitle: '', metaDescription: '' }} columns={[{ key: 'page', label: 'Page' }, { key: 'metaTitle', label: 'Title' }]} /></AdminSuspense>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
