import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { publicApi } from '../../api';
import SectionTitle from '../ui/SectionTitle';
import { getImageUrl } from '../../utils/helpers';

const categories = ['All', 'Business Websites', 'CRM Systems', 'ERP Solutions', 'Enterprise Software', 'Mobile Apps', 'E-Commerce'];

export default function Portfolio({ limit }) {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    publicApi.portfolio().then((res) => {
      const data = res.data.data || [];
      setProjects(limit ? data.slice(0, limit) : data);
    }).catch(() => {});
  }, [limit]);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <SectionTitle subtitle="Portfolio" title="Our Recent Projects" description="Explore our successful deliveries across industries." />
        {!limit && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat ? 'gradient-bg text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-600 to-primary-900 overflow-hidden">
                {project.featuredImage && (
                  <img src={getImageUrl(project.featuredImage)} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-semibold">{project.category}</span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary-600 uppercase">{project.category}</span>
                <h3 className="font-display font-bold text-lg mt-1 mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || []).slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-1 text-xs rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {limit && (
          <div className="text-center mt-10">
            <Link to="/portfolio" className="px-8 py-3 rounded-xl border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-600 hover:text-white transition-colors">
              View All Projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
