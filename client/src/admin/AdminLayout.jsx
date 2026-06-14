import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiLogout, HiHome } from 'react-icons/hi';
import {
  FaTachometerAlt, FaRocket, FaInfoCircle, FaCogs, FaBriefcase,
  FaComments, FaQuestionCircle, FaEnvelope, FaBlog, FaDollarSign,
  FaUsers, FaCog, FaSearch, FaImage, FaLayerGroup, FaCode,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: FaTachometerAlt },
  { path: '/admin/hero', label: 'Hero', icon: FaRocket },
  { path: '/admin/about', label: 'About', icon: FaInfoCircle },
  { path: '/admin/services', label: 'Services', icon: FaCogs },
  { path: '/admin/solutions', label: 'Solutions', icon: FaLayerGroup },
  { path: '/admin/portfolio', label: 'Portfolio', icon: FaBriefcase },
  { path: '/admin/tech-stack', label: 'Tech Stack', icon: FaCode },
  { path: '/admin/pricing', label: 'Pricing', icon: FaDollarSign },
  { path: '/admin/testimonials', label: 'Testimonials', icon: FaComments },
  { path: '/admin/client-logos', label: 'Client Logos', icon: FaImage },
  { path: '/admin/careers', label: 'Careers', icon: FaUsers },
  { path: '/admin/blogs', label: 'Blogs', icon: FaBlog },
  { path: '/admin/faqs', label: 'FAQs', icon: FaQuestionCircle },
  { path: '/admin/contacts', label: 'Inquiries', icon: FaEnvelope },
  { path: '/admin/why-choose-us', label: 'Why Choose Us', icon: FaCogs },
  { path: '/admin/seo', label: 'SEO', icon: FaSearch },
  { path: '/admin/settings', label: 'Settings', icon: FaCog },
  { path: '/admin/users', label: 'Users', icon: FaUsers, adminOnly: true },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const filteredMenu = menuItems.filter((m) => !m.adminOnly || user?.role === 'admin');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary-950 text-white transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center font-bold">AC</div>
            <div>
              <p className="font-bold text-sm">Astra Cognix</p>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${active ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white mb-2">
            <HiHome className="w-4 h-4" /> View Website
          </a>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 w-full">
            <HiLogout className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 dark:text-white">
            <HiMenu className="w-6 h-6" />
          </button>
          <h1 className="font-display font-bold text-lg text-gray-900 dark:text-white hidden sm:block">
            {filteredMenu.find((m) => m.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-gray-600 dark:text-gray-300">{user?.name}</span>
            <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.[0]}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
