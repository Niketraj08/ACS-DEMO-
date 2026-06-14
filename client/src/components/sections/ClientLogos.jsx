import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { publicApi } from '../../api';
import { getImageUrl } from '../../utils/helpers';

export default function ClientLogos() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    publicApi.clientLogos().then((res) => setLogos(res.data.data || [])).catch(() => {});
  }, []);

  if (!logos.length) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        <div className="container-custom">
          <p className="text-center text-gray-500 mb-8 text-sm font-semibold uppercase tracking-widest">Trusted By Leading Companies</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {['TechCorp', 'InnovateLabs', 'ShopEase', 'DataFlow', 'CloudNine'].map((name) => (
              <div key={name} className="px-8 py-4 rounded-xl bg-white dark:bg-gray-800 font-bold text-gray-400">{name}</div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      <div className="container-custom">
        <p className="text-center text-gray-500 mb-8 text-sm font-semibold uppercase tracking-widest">Trusted By Leading Companies</p>
        <div className="flex animate-marquee gap-12">
          {[...logos, ...logos].map((logo, i) => (
            <motion.div key={i} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              {logo.logo ? (
                <img src={getImageUrl(logo.logo)} alt={logo.name} className="h-12 w-auto object-contain" />
              ) : (
                <span className="text-xl font-bold text-gray-400">{logo.name}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
