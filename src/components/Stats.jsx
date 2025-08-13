'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Code, Users, Award, Clock } from 'lucide-react';

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    hours: 0
  });

  const stats = [
    {
      icon: Code,
      number: 25,
      label: 'Projects Completed',
      suffix: '+',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      number: 15,
      label: 'Happy Clients',
      suffix: '+',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      number: 3,
      label: 'Years Experience',
      suffix: '+',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      number: 2000,
      label: 'Hours Coded',
      suffix: '+',
      color: 'from-orange-500 to-red-500'
    }
  ];

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts({
          projects: Math.floor(stats[0].number * progress),
          clients: Math.floor(stats[1].number * progress),
          experience: Math.floor(stats[2].number * progress),
          hours: Math.floor(stats[3].number * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                className="space-y-2"
              >
                <div className="text-3xl font-bold gradient-text">
                  {counts[Object.keys(counts)[index]]}
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
