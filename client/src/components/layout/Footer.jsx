import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { publicApi } from '../../api';
import { DynamicIcon } from '../../utils/icons';

const socialIcons = { FaLinkedin, FaTwitter, FaFacebook, FaInstagram };

export default function Footer() {
  const [footer, setFooter] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    publicApi.footer().then((res) => setFooter(res.data.data)).catch(() => {});
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await publicApi.newsletter(email);
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch {
      toast.error('Subscription failed');
    }
  };

  const f = footer || {};
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-gray-300">
      <div className="section-padding pb-8">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold">AC</div>
              <span className="font-display font-bold text-white text-lg">Astra Cognix</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">{f.companyDescription || 'Your trusted partner for innovative digital solutions.'}</p>
            <div className="flex gap-3">
              {(f.socialLinks || []).map((s, i) => {
                const Icon = socialIcons[s.icon] || DynamicIcon;
                return (
                  <a key={i} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors">
                    {socialIcons[s.icon] ? <Icon className="w-5 h-5" /> : <DynamicIcon name={s.icon} className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {(f.quickLinks || [{ label: 'Home', url: '/' }, { label: 'About', url: '/about' }, { label: 'Services', url: '/services' }, { label: 'Contact', url: '/contact' }]).map((l, i) => (
                <li key={i}><Link to={l.url} className="text-sm hover:text-primary-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {(f.serviceLinks || [{ label: 'Web Development', url: '/services' }, { label: 'Mobile Apps', url: '/services' }, { label: 'AI Solutions', url: '/services' }]).map((l, i) => (
                <li key={i}><Link to={l.url} className="text-sm hover:text-primary-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for tech insights and updates.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
                required
              />
              <button type="submit" className="px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors font-medium text-white">
                Join
              </button>
            </form>
            <div className="mt-6 space-y-2 text-sm">
              {f.email && <p>📧 {f.email}</p>}
              {f.phone && <p>📞 {f.phone}</p>}
              {f.address && <p>📍 {f.address}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container-custom text-center text-sm">
          {f.copyright || `© ${year} Astra Cognix Solutions Pvt Ltd. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
