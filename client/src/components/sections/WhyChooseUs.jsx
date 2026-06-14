import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { publicApi } from '../../api';
import SectionTitle from '../ui/SectionTitle';
import { DynamicIcon } from '../../utils/icons';

export default function WhyChooseUs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    publicApi.whyChooseUs().then((res) => setData(res.data.data)).catch(() => {});
  }, []);

  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        <SectionTitle
          light
          subtitle="Why Choose Us"
          title={data?.title || 'Why Choose Astra Cognix'}
          description={data?.subtitle}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data?.items || []).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl hover:bg-white/20 transition-colors"
            >
              <DynamicIcon name={item.icon} className="w-10 h-10 text-primary-300 mb-4" />
              <h3 className="font-display font-bold text-lg text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
