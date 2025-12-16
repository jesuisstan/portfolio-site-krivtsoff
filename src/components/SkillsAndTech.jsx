'use client';

import { useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  Code,
  Database,
  Globe,
  Palette,
  Server,
  Smartphone
} from 'lucide-react';
import Image from 'next/image';

export function SkillsAndTech() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState('All');

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      skills: [
        { name: 'React.js', level: 90, color: 'from-blue-500 to-purple-600' },
        { name: 'Next.js', level: 85, color: 'from-black to-gray-700' },
        {
          name: 'TypeScript',
          level: 80,
          color: 'from-indigo-600 to-purple-800'
        },
        { name: 'Tailwind CSS', level: 85, color: 'from-cyan-500 to-blue-600' },
        { name: 'HTML/CSS', level: 95, color: 'from-orange-500 to-red-500' }
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      skills: [
        { name: 'Node.js', level: 80, color: 'from-green-500 to-green-700' },
        { name: 'Express.js', level: 75, color: 'from-gray-600 to-gray-800' },
        { name: 'Python', level: 70, color: 'from-yellow-500 to-orange-500' },
        { name: 'PostgreSQL', level: 75, color: 'from-blue-600 to-indigo-800' },
        { name: 'MongoDB', level: 70, color: 'from-green-500 to-green-700' }
      ]
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      skills: [
        {
          name: 'React Native',
          level: 75,
          color: 'from-purple-500 to-pink-600'
        },
        { name: 'Expo', level: 70, color: 'from-purple-500 to-pink-500' },
        {
          name: 'Mobile UI/UX',
          level: 80,
          color: 'from-indigo-500 to-purple-500'
        }
      ]
    },
    {
      title: 'Design & Tools',
      icon: Palette,
      skills: [
        { name: 'Figma', level: 75, color: 'from-purple-500 to-pink-500' },
        { name: 'Git', level: 85, color: 'from-orange-500 to-red-500' },
        { name: 'Docker', level: 70, color: 'from-blue-500 to-cyan-600' },
        { name: 'AWS', level: 65, color: 'from-orange-500 to-yellow-500' }
      ]
    }
  ];

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
      name: 'JavaScript',
      icon: '/powered-by/logo-js.png',
      category: 'Language'
    },
    {
      name: 'TypeScript',
      icon: '/powered-by/logo-ts.png',
      category: 'Language'
    },
    {
      name: 'HTML5',
      icon: '/powered-by/logo-html.png',
      category: 'Frontend'
    },
    {
      name: 'CSS3',
      icon: '/powered-by/logo-css.png',
      category: 'Styling'
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
      name: 'GraphQL',
      icon: '/powered-by/logo-graph-ql.png',
      category: 'API'
    },
    {
      name: 'Apollo',
      icon: '/powered-by/logo-apollo.png',
      category: 'API'
    },
    {
      name: 'Next Auth',
      icon: '/powered-by/logo-next-auth.png',
      category: 'Authentication'
    },
    {
      name: 'JWT',
      icon: '/powered-by/logo-jwt.svg',
      category: 'Authentication'
    },
    {
      name: 'OAuth',
      icon: '/powered-by/logo-oauth.svg',
      category: 'Authentication'
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
      name: 'Highcharts',
      icon: '/powered-by/logo-highcharts.png',
      category: 'Frontend'
    },
    {
      name: 'Next Intl',
      icon: '/powered-by/logo-next-intl.png',
      category: 'Frontend'
    },
    {
      name: 'Vercel',
      icon: '/powered-by/logo-vercel.svg',
      category: 'Deployment'
    },
    {
      name: 'Vercel Blob',
      icon: '/powered-by/logo-vercel-blob.svg',
      category: 'Storage'
    }
  ];

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Database',
    'Styling',
    'API',
    'Authentication',
    'DevOps',
    'Tools',
    'Language',
    'Deployment',
    'Storage'
  ];

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
        {/* Skills Section */}
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
            I specialize in modern web technologies and frameworks, creating
            responsive and scalable applications with a comprehensive tech
            stack.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-2"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="glass-effect card-hover rounded-2xl p-8"
              >
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 via-blue-600 to-purple-700">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{
                        delay: categoryIndex * 0.2 + skillIndex * 0.1
                      }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            isInView
                              ? { width: `${skill.level}%` }
                              : { width: 0 }
                          }
                          transition={{
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                            duration: 1,
                            ease: 'easeOut'
                          }}
                          className={`h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Tech Stack
          </h3>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.6 }}
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
          transition={{ delay: 1.2, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
        >
          {filteredTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 1.4 + index * 0.05, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="group relative"
            >
              <div className="glass-effect card-hover rounded-xl p-4 text-center">
                <div className="relative mx-auto mb-3 h-12 w-12">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12vw"
                    className="object-contain"
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
