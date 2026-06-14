import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { publicApi } from '../api';
import SEO from '../components/ui/SEO';
import SectionTitle from '../components/ui/SectionTitle';
import { DynamicIcon } from '../utils/icons';
import CTA from '../components/sections/CTA';

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    publicApi.solutions().then((res) => setSolutions(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <>
      <SEO title="Solutions" description="Enterprise digital transformation solutions." />
      <div className="pt-28 pb-8 gradient-bg">
        <div className="container-custom text-center text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Solutions</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Tailored technology solutions for complex business challenges.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle subtitle="Enterprise" title="Business Solutions" />
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((s, i) => (
              <motion.div
                key={s._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <DynamicIcon name={s.icon} className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2 text-gray-900 dark:text-white">{s.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
