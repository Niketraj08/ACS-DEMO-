import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { publicApi } from '../../api';
import SectionTitle from '../ui/SectionTitle';
import { DynamicIcon } from '../../utils/icons';

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const num = parseInt(value) || 0;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, num]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold gradient-text">
      {count}{suffix}
    </span>
  );
}

export default function About({ compact = false }) {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    publicApi.about().then((res) => setAbout(res.data.data)).catch(() => {});
  }, []);

  const data = about || {};

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <SectionTitle
          subtitle="About Us"
          title={data.title || 'Who We Are'}
          description={data.content}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {data.mission && (
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="font-display font-bold text-xl text-primary-900 dark:text-white mb-2">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400">{data.mission}</p>
              </div>
            )}
            {data.vision && (
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="font-display font-bold text-xl text-primary-900 dark:text-white mb-2">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-400">{data.vision}</p>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="font-display font-bold text-xl mb-4 text-gray-900 dark:text-white">Core Values</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {(data.coreValues || []).map((v, i) => (
                <div key={i} className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <DynamicIcon name={v.icon} className="w-8 h-8 text-primary-600 mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{v.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{v.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {!compact && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {(data.highlights || []).map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl gradient-bg text-white"
                >
                  <h4 className="font-display font-bold text-lg mb-2">{h.title}</h4>
                  <p className="text-gray-200 text-sm">{h.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {(data.statistics || [
                { label: 'Projects Delivered', value: '150', suffix: '+' },
                { label: 'Happy Clients', value: '100', suffix: '+' },
                { label: 'Expert Developers', value: '25', suffix: '+' },
                { label: 'Client Satisfaction', value: '98', suffix: '%' },
              ]).map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center">
                  <Counter value={s.value} suffix={s.suffix} />
                  <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
