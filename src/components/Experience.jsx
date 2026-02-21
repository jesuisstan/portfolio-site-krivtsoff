'use client';

import { useRef } from 'react';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  Award,
  Calendar,
  ExternalLink,
  GraduationCap,
  MapPin,
  User
} from 'lucide-react';

import { experiences } from '@/constants/experiences';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
    <section
      id="experience"
      className="bg-gradient-to-b from-white to-gray-50 py-12 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-8 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-6 text-4xl font-bold lg:text-5xl"
          >
            <span className="gradient-text">Experience</span> & Education
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300"
          >
            My journey from management education to full-stack development
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 h-full w-0.5 transform bg-gray-200 dark:bg-gray-700 md:left-1/2 md:-translate-x-1/2" />

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              className={`relative mb-8 flex flex-col gap-8 md:flex-row ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 z-10 h-4 w-4 transform rounded-full border-4 border-white bg-gradient-to-r from-teal-600 to-blue-600 dark:border-gray-900 md:left-1/2 md:-translate-x-1/2" />

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 md:w-6/12 lg:w-6/12"
              >
                {/* Type Badge */}
                <div className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                  {experience.type === 'Freelance' && (
                    <Award className="mr-1 h-3 w-3" />
                  )}
                  {experience.type === 'Education' && (
                    <GraduationCap className="mr-1 h-3 w-3" />
                  )}
                  {experience.type === 'Management' && (
                    <User className="mr-1 h-3 w-3" />
                  )}
                  {experience.type}
                </div>

                <h3 className="mb-1 text-xl font-bold">{experience.title}</h3>
                <h4 className="mb-1 text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {experience.companyUrl ? (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 underline decoration-dotted underline-offset-4 transition-colors duration-200 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      {experience.company}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    experience.company
                  )}
                </h4>

                <div className="mb-2 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {experience.period}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {experience.location}
                  </div>
                </div>

                <p className="mb-2 leading-relaxed text-gray-600 dark:text-gray-300">
                  {experience.description}
                </p>

                {/* Certificates List */}
                {experience.certificates && (
                  <div className="mb-3">
                    <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {experience.id === 2
                        ? 'State-recognized certifications (RNCP):'
                        : 'Academic degrees:'}
                    </p>
                    <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      {experience.certificates.map((cert, idx) => (
                        <li key={idx}>
                          {cert.url ? (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 underline decoration-dotted underline-offset-2 transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              {cert.title}
                            </a>
                          ) : (
                            <span className="font-medium">{cert.title}</span>
                          )}
                          {' - '}
                          <span className="text-blue-600 dark:text-blue-400">
                            {cert.level}
                          </span>{' '}
                          <span className="text-gray-500 dark:text-gray-400">
                            ({cert.date})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Positions List */}
                {experience.positions && (
                  <div className="mb-3">
                    <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Positions:
                    </p>
                    <ul className="ml-4 list-disc space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      {experience.positions.map((position, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{position.title}</span>
                          {' at '}
                          {position.companyUrl ? (
                            <a
                              href={position.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 underline decoration-dotted underline-offset-2 transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              {position.company}
                            </a>
                          ) : (
                            <span className="font-medium">
                              {position.company}
                            </span>
                          )}
                          {': '}
                          <span className="text-gray-600 dark:text-gray-400">
                            {position.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-900 dark:bg-gray-700 dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
