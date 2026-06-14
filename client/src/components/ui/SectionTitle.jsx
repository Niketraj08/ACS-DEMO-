import { motion } from 'framer-motion';

export default function SectionTitle({ subtitle, title, description, light = false, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 md:mb-16 ${center ? 'text-center max-w-3xl mx-auto' : ''}`}
    >
      {subtitle && (
        <span className={`inline-block text-sm font-semibold uppercase tracking-widest mb-3 ${light ? 'text-primary-300' : 'text-primary-600 dark:text-primary-400'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg ${light ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>{description}</p>
      )}
    </motion.div>
  );
}
