'use client';

import { useRef, useState } from 'react';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

import { categories, technologies } from '@/constants/technologies';

export function SkillsAndTech() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTechnologies =
    activeCategory === 'All'
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section
      id="skills"
      className="bg-gradient-to-b from-gray-50 to-gray-50 py-12 dark:from-gray-800 dark:to-gray-800"
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Tech Stack Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-8 text-4xl font-bold lg:text-5xl"
          >
            <span className="gradient-text">Skills</span> & Technologies
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-3xl text-xl text-gray-600 dark:text-gray-300"
          >
            I specialize in modern web and mobile technologies, creating
            responsive and scalable applications with a comprehensive tech
            stack.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-1 font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
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
          className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
        >
          {filteredTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.6 + index * 0.05, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="group relative"
            >
              <div className="glass-effect card-hover rounded-xl p-4 text-center">
                <div className="relative mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200/40 p-2">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12vw"
                    className="object-contain p-1.5"
                  />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {tech.name}
                </h3>
                <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
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
