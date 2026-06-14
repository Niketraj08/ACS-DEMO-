import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Careers', path: '/careers' },
  { label: 'Testimonials', path: '/#testimonials' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Blog', path: '/blog' },
  { label: 'FAQ', path: '/faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    if (path.startsWith('/#')) return pathname === '/' && window.location.hash === path.slice(1);
    return pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-primary-950/95 backdrop-blur-xl shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-lg shadow-lg">
            AC
          </div>
          <div className="hidden sm:block">
            <span className={`font-display font-bold text-lg leading-tight block ${scrolled ? 'text-primary-900 dark:text-white' : 'text-white'}`}>
              Astra Cognix
            </span>
            <span className={`text-xs ${scrolled ? 'text-gray-500' : 'text-gray-300'}`}>Solutions Pvt Ltd</span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.path)
                  ? scrolled
                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30'
                    : 'text-white bg-white/20'
                  : scrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600'
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'}`}
            aria-label="Toggle theme"
          >
            {darkMode ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>
          <Button href="/contact" variant={scrolled ? 'outline' : 'secondary'} size="sm">
            Get Quote
          </Button>
          <Button href="/contact" variant="primary" size="sm">
            Free Consultation
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <button onClick={toggleTheme} className={`p-2 ${scrolled ? 'text-gray-700 dark:text-white' : 'text-white'}`}>
            {darkMode ? <HiSun className="w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className={`p-2 ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
          >
            {open ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-primary-950 border-t dark:border-gray-800 shadow-xl"
          >
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button href="/contact" variant="outline" className="w-full justify-center">Get Quote</Button>
                <Button href="/contact" variant="primary" className="w-full justify-center">Free Consultation</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
