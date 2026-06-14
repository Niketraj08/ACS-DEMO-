import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { publicApi } from '../../api';
import SectionTitle from '../ui/SectionTitle';
import { DynamicIcon } from '../../utils/icons';
import { getImageUrl } from '../../utils/helpers';

export default function Services({ limit }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    publicApi.services().then((res) => {
      const data = res.data.data || [];
      setServices(limit ? data.slice(0, limit) : data);
    }).catch(() => {});
  }, [limit]);

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          subtitle="Our Services"
          title="Comprehensive IT Solutions"
          description="End-to-end technology services designed to accelerate your business growth."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {service.image ? (
                <img src={getImageUrl(service.image)} alt={service.title} className="w-full h-32 object-cover rounded-xl mb-4" />
              ) : (
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <DynamicIcon name={service.icon} className="w-7 h-7 text-white" />
                </div>
              )}
              <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {service.shortDescription || service.description}
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:gap-3 transition-all">
                Read More <FaArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
        {limit && (
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-opacity">
              View All Services <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
