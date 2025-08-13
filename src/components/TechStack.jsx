'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState('All');

  const technologies = [
    {
      name: 'React',
      icon: '/powered-by/logo-react.png',
      category: 'Frontend'
    },
    {
      name: 'Next.js',
      icon: '/powered-by/logo-nextjs.png',
      category: 'Frontend'
    },
    {
      name: 'TypeScript',
      icon: '/powered-by/logo-ts.png',
      category: 'Language'
    },
    {
      name: 'Node.js',
      icon: '/powered-by/logo-node.png',
      category: 'Backend'
    },
    {
      name: 'MongoDB',
      icon: '/powered-by/logo-mongodb.png',
      category: 'Database'
    },
    {
      name: 'PostgreSQL',
      icon: '/powered-by/logo-vercel-postgresql.svg',
      category: 'Database'
    },
    {
      name: 'Docker',
      icon: '/powered-by/logo-docker.png',
      category: 'DevOps'
    },
    {
      name: 'Git',
      icon: '/powered-by/logo-git.png',
      category: 'Tools'
    },
    {
      name: 'Tailwind CSS',
      icon: '/powered-by/logo-tailwindcss.png',
      category: 'Styling'
    },
    {
      name: 'Material-UI',
      icon: '/powered-by/logo-material-ui.png',
      category: 'Styling'
    },
    {
      name: 'GraphQL',
      icon: '/powered-by/logo-graph-ql.png',
      category: 'API'
    },
    {
      name: 'Apollo',
      icon: '/powered-by/logo-apollo.png',
      category: 'API'
    }
  ];

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Database',
    'Styling',
    'API',
    'DevOps',
    'Tools',
    'Language'
  ];

  const filteredTechnologies =
    activeCategory === 'All'
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Tech</span> Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="group relative"
            >
              <div className="glass-effect rounded-2xl p-6 text-center card-hover">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {tech.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
