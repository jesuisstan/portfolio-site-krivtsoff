'use client';

import { useEffect, useRef, useState } from 'react';

import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { BarChart3, Code, Eye, Github } from 'lucide-react';
import Image from 'next/image';

import { projects } from '@/constants/projects';

function TooltipDescription({ description }) {
  const descRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const updateTooltipPosition = () => {
    if (descRef.current) {
      const rect = descRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
  };

  useEffect(() => {
    if (isHovered) {
      updateTooltipPosition();

      const handleScroll = () => updateTooltipPosition();
      const handleResize = () => updateTooltipPosition();

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isHovered]);

  if (description.length <= 100) {
    return (
      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {description}
      </p>
    );
  }

  return (
    <div className="mb-4">
      <p
        ref={descRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
      >
        {description}
      </p>
      {isHovered && (
        <div
          ref={tooltipRef}
          className="pointer-events-none fixed z-[9999] w-72 rounded-lg bg-gray-900 px-4 py-3 text-sm leading-relaxed text-white shadow-xl dark:border dark:border-gray-600 dark:bg-gray-700"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`
          }}
        >
          {description}
          <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 bg-gray-900 dark:border-l dark:border-t dark:border-gray-600 dark:bg-gray-700" />
        </div>
      )}
    </div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredProject, setHoveredProject] = useState(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Game', 'Mobile'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => {
          const projectCategories = Array.isArray(project.category)
            ? project.category
            : [project.category];
          return projectCategories.includes(activeCategory);
        });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="projects" className="bg-white py-12 dark:bg-gray-900">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
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
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300"
          >
            Here are some of my recent projects that showcase my skills and
            passion for web development.
          </motion.p>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-1 font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          key={activeCategory}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="card-hover group relative rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                  {(Array.isArray(project.category)
                    ? project.category
                    : [project.category]
                  ).map((category, idx) => (
                    <div
                      key={idx}
                      className="rounded-full bg-gradient-to-r from-teal-600/90 to-blue-600/90 px-2 py-1 backdrop-blur-sm"
                    >
                      <span className="text-xs font-medium text-white">
                        {category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {project.title}
                </h3>
                <TooltipDescription description={project.description} />

                {/* Technologies */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="button-primary flex flex-1 items-center justify-center space-x-1.5 py-1.5 text-center text-xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="button-secondary flex flex-1 items-center justify-center space-x-1.5 py-1.5 text-center text-xs"
                    >
                      <Code className="h-3.5 w-3.5" />
                      <span>Code</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href={process.env.NEXT_PUBLIC_LINK_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary inline-flex items-center space-x-3 px-8 py-4 text-lg"
            >
              <Github className="h-6 w-6" />
              <span>View More on GitHub</span>
            </motion.a>

            <motion.button
              onClick={() =>
                window.open(
                  `https://octoprofile.vercel.app/user?id=${process.env.NEXT_PUBLIC_GITHUB_PROFILE}`,
                  '_blank'
                )
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-secondary inline-flex items-center space-x-3 px-8 py-4 text-lg"
            >
              <BarChart3 className="h-6 w-6" />
              <span>GitHub Stats</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
