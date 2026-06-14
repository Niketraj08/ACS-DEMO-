import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { publicApi } from '../../api';
import SectionTitle from '../ui/SectionTitle';
import { getImageUrl } from '../../utils/helpers';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    publicApi.testimonials().then((res) => setTestimonials(res.data.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) return null;
  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-custom">
        <SectionTitle subtitle="Testimonials" title="What Our Clients Say" />
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center p-8 md:p-12 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700"
            >
              <FaQuoteLeft className="w-10 h-10 text-primary-200 mx-auto mb-6" />
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-4">
                {t.image ? (
                  <img src={getImageUrl(t.image)} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl">
                    {t.name?.[0]}
                  </div>
                )}
                <div className="text-left">
                  <p className="font-bold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
