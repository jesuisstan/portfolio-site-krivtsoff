'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Award, GraduationCap, User } from 'lucide-react';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      id: 1,
      title: 'Full-Stack Developer',
      company: 'Freelance',
      type: 'Freelance',
      period: '2022 - Present',
      location: 'Paris, France',
      description: 'Developing modern web applications using React, Node.js, and cloud technologies. Working with clients to create scalable and user-friendly solutions.',
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS']
    },
    {
      id: 2,
      title: 'École 42 Student',
      company: 'École 42',
      type: 'Education',
      period: '2021 - 2023',
      location: 'Paris, France',
      description: 'Completed intensive programming curriculum focusing on C, C++, algorithms, and web development. Participated in peer-to-peer learning environment.',
      technologies: ['C', 'C++', 'JavaScript', 'Python', 'Docker']
    },
    {
      id: 3,
      title: 'Project Manager',
      company: 'Previous Company',
      type: 'Management',
      period: '2018 - 2021',
      location: 'Paris, France',
      description: 'Led cross-functional teams in delivering complex projects. Managed stakeholder relationships and ensured project success through effective communication.',
      technologies: ['Agile', 'Scrum', 'JIRA', 'Confluence', 'Leadership']
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Freelance':
        return Award;
      case 'Education':
        return GraduationCap;
      case 'Management':
        return User;
      default:
        return User;
    }
  };

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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Experience</span> & Journey
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            My professional journey from project management to full-stack
            development
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700 transform md:-translate-x-1/2" />

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 transform md:-translate-x-1/2 z-10" />

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg md:w-1/2"
              >
                {/* Type Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {experience.type === 'Freelance' && (
                    <Award className="w-3 h-3 mr-1" />
                  )}
                  {experience.type === 'Education' && (
                    <GraduationCap className="w-3 h-3 mr-1" />
                  )}
                  {experience.type === 'Management' && (
                    <User className="w-3 h-3 mr-1" />
                  )}
                  {experience.type}
                </div>

                <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {experience.company}
                </h4>

                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {experience.period}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {experience.location}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {experience.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Let's Work Together
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary inline-flex items-center space-x-2"
          >
            <span>Get in Touch</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
