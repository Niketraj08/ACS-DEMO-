import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { publicApi } from '../../api';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

export default function Pricing() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    publicApi.pricing().then((res) => setPlans(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <SectionTitle subtitle="Pricing" title="Flexible Plans for Every Business" description="Transparent pricing with no hidden costs." />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl ${
                plan.isPopular
                  ? 'gradient-bg text-white shadow-2xl scale-105 z-10'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-primary-900 text-xs font-bold rounded-full">
                  POPULAR
                </span>
              )}
              <h3 className={`font-display font-bold text-xl mb-2 ${plan.isPopular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{plan.name}</h3>
              <div className="mb-4">
                <span className={`text-4xl font-bold ${plan.isPopular ? 'text-white' : 'gradient-text'}`}>{plan.price}</span>
                <span className={`text-sm ${plan.isPopular ? 'text-gray-200' : 'text-gray-500'}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-6 ${plan.isPopular ? 'text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {(plan.features || []).map((f, j) => (
                  <li key={j} className={`flex items-center gap-2 text-sm ${plan.isPopular ? 'text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    <FaCheck className={`w-4 h-4 flex-shrink-0 ${plan.isPopular ? 'text-green-300' : 'text-green-500'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant={plan.isPopular ? 'secondary' : 'primary'} className="w-full justify-center">
                {plan.ctaText || 'Get Started'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
