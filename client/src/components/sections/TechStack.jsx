import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { publicApi } from '../../api';
import SectionTitle from '../ui/SectionTitle';

export default function TechStack() {
  const [data, setData] = useState(null);

  useEffect(() => {
    publicApi.techStack().then((res) => setData(res.data.data)).catch(() => {});
  }, []);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionTitle subtitle="Technologies" title={data?.title || 'Our Technology Stack'} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {(data?.categories || []).map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg"
            >
              <h3 className="font-display font-bold text-primary-600 dark:text-primary-400 mb-4 text-center">{cat.name}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {(cat.items || []).map((item, j) => (
                  <span key={j} className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
