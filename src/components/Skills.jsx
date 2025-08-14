'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Code,
  Database,
  Globe,
  Smartphone,
  Palette,
  Server
} from 'lucide-react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
      className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold mb-8"
          >
            <span className="gradient-text">Skills</span> & Expertise
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            I specialize in modern web technologies and frameworks, creating
            responsive and scalable applications.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-12"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="glass-effect rounded-2xl p-10 card-hover"
            >
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-700 rounded-2xl flex items-center justify-center mr-6">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-8">
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
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
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

        {/* Additional Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Other Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'JavaScript',
              'TypeScript',
              'HTML5',
              'CSS3',
              'SASS',
              'Bootstrap',
              'Material-UI',
              'Redux',
              'GraphQL',
              'REST API',
              'JWT',
              'OAuth',
              'Jest',
              'Cypress',
              'Webpack',
              'Vite',
              'NPM',
              'Yarn',
              'Linux',
              'VS Code',
              'Postman',
              'Insomnia',
              'MongoDB Compass'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: 1 + index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-200 dark:bg-gray-700 rounded-xl p-6 text-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
