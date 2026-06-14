import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import { publicApi } from '../../api';
import Button from '../ui/Button';

const defaultCards = [
  { title: 'Projects', value: '150+', icon: 'projects' },
  { title: 'Clients', value: '100+', icon: 'clients' },
  { title: 'Experts', value: '25+', icon: 'experts' },
];

const cardIcons = { projects: FaProjectDiagram, clients: FaUsers, experts: FaRocket };

export default function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    publicApi.hero().then((res) => setHero(res.data.data)).catch(() => {});
  }, []);

  const data = hero || {};
  const cards = data.floatingCards?.length ? data.floatingCards : defaultCards;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary-200 text-sm font-medium mb-6 border border-white/20">
            🚀 Next-Gen IT Solutions
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {data.headline || 'Transforming Ideas Into Digital Excellence'}
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
            {data.subheadline || 'Astra Cognix Solutions Pvt Ltd delivers innovative software, web, mobile, AI, cloud, and digital transformation solutions that empower businesses to scale faster.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg">{data.primaryCta || 'Get Started'}</Button>
            <Button href="/contact" variant="secondary" size="lg">{data.secondaryCta || 'Book Free Consultation'}</Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-3xl glass p-8 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4">
                {['React', 'Node.js', 'AI/ML', 'Cloud'].map((tech, i) => (
                  <motion.div
                    key={tech}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className="p-4 rounded-2xl bg-white/10 text-center"
                  >
                    <span className="text-2xl mb-2 block">{['⚛️', '🟢', '🤖', '☁️'][i]}</span>
                    <span className="text-white font-semibold text-sm">{tech}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-primary-500/30 to-cyan-500/30 text-center">
                <p className="text-white font-display font-bold text-xl">Digital Excellence</p>
                <p className="text-gray-300 text-sm mt-1">Enterprise Solutions</p>
              </div>
            </div>
            {cards.map((card, i) => {
              const Icon = cardIcons[card.icon] || FaRocket;
              const positions = ['-top-4 -right-4', '-bottom-4 -left-4', 'top-1/2 -right-8'];
              return (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.7 }}
                  className={`absolute ${positions[i]} glass px-5 py-4 rounded-2xl shadow-2xl`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{card.value}</p>
                      <p className="text-xs text-gray-300">{card.title}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
