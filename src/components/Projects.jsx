'use client';

import { useRef, useState } from 'react';

import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Code,
  ExternalLink,
  Eye,
  Github,
  Globe,
  Smartphone
} from 'lucide-react';
import Image from 'next/image';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Hypertube',
      description:
        'A Netflix-like streaming platform built with React, Node.js, and WebRTC. Features include video streaming, user authentication, and a responsive design.',
      image: '/projects/project-hypertube.png',
      technologies: ['React', 'Node.js', 'WebRTC', 'Express', 'MongoDB'],
      category: 'Full-Stack',
      liveUrl: 'https://hypertube-video-library.vercel.app',
      githubUrl: 'https://github.com/jesuisstan/hypertube',
      icon: Globe,
      featured: true
    },
    {
      id: 2,
      title: 'Matcha',
      description:
        'A dating application with real-time chat, user matching algorithms, and profile management. Built with modern web technologies.',
      image: '/projects/project-matcha.png',
      technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL', 'Redis'],
      category: 'Full-Stack',
      liveUrl: 'https://matcha-find-your-date.vercel.app',
      githubUrl: 'https://github.com/jesuisstan/matcha',
      icon: Globe,
      featured: true
    },
    {
      id: 3,
      title: 'ImgOmio',
      description:
        'An image processing and sharing platform with filters, effects, and social features. Users can upload, edit, and share their photos.',
      image: '/projects/project-imgOmio.png',
      technologies: ['React', 'Canvas API', 'Node.js', 'AWS S3', 'Express'],
      category: 'Full-Stack',
      liveUrl: 'https://imgomio.krivtsoff.me',
      githubUrl: 'https://github.com/jesuisstan/imgomio',
      icon: Globe,
      featured: true
    },
    {
      id: 4,
      title: 'Contact Manager',
      description:
        'A comprehensive contact management system with CRUD operations, search functionality, and data export features.',
      image: '/projects/project-contact.png',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
      category: 'Frontend',
      liveUrl: 'https://contact-manager.krivtsoff.me',
      githubUrl: 'https://github.com/jesuisstan/contact-manager',
      icon: Code,
      featured: false
    },
    {
      id: 5,
      title: 'Interactive Map',
      description:
        'A dynamic map application with location tracking, custom markers, and real-time data visualization.',
      image: '/projects/project-map.png',
      technologies: ['React', 'Mapbox GL', 'TypeScript', 'Geolocation API'],
      category: 'Frontend',
      liveUrl: 'https://map.krivtsoff.me',
      githubUrl: 'https://github.com/jesuisstan/interactive-map',
      icon: Globe,
      featured: false
    },
    {
      id: 6,
      title: 'Pong Game',
      description:
        'A classic Pong game implementation with modern graphics, sound effects, and multiplayer support.',
      image: '/projects/project-pong.png',
      technologies: ['JavaScript', 'Canvas API', 'Web Audio API', 'Socket.io'],
      category: 'Game',
      liveUrl: 'https://pong.krivtsoff.me',
      githubUrl: 'https://github.com/jesuisstan/pong-game',
      icon: Code,
      featured: false
    }
  ];

  const categories = ['All', 'Full-Stack', 'Frontend', 'Game'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

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
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="card-hover group relative overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex space-x-6">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
                      >
                        <ExternalLink className="h-6 w-6 text-white" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
                      >
                        <Github className="h-6 w-6 text-white" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute left-6 top-6">
                  <div className="flex items-center space-x-3 rounded-full bg-gradient-to-r from-teal-600/90 to-blue-600/90 px-4 py-2 backdrop-blur-sm">
                    <project.icon className="h-5 w-5 text-white" />
                    <span className="text-sm font-medium text-white">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute right-6 top-6">
                    <div className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2">
                      <span className="text-sm font-medium text-white">
                        Featured
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="mb-4 text-2xl font-bold transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {project.title}
                </h3>
                <p className="mb-6 line-clamp-3 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-8 flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
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
