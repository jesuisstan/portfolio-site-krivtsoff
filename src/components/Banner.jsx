'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Github,
  Linkedin,
  Download,
  FolderOpen,
  Award,
  Clock,
  Briefcase
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

export function Banner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState({
    projects: 0,
    experience: 0,
    hours: 0,
    certifications: 0
  });

  const stats = [
    {
      icon: FolderOpen,
      number: 25,
      label: 'Projects Completed',
      suffix: '+',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Briefcase,
      number: 2,
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
    },
    {
      icon: Award,
      number: 3,
      label: 'IT Certifications',
      suffix: '',
      color: 'from-green-500 to-emerald-500'
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
          experience: Math.floor(stats[1].number * progress),
          hours: Math.floor(stats[2].number * progress),
          certifications: Math.floor(stats[3].number * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  const downloadCV = () => {
    // Create link to PDF file in public folder
    const cvUrl = '/Krivtsov Stanislav_Frontend developer_CV.pdf';

    // Create temporary <a> element for download
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Krivtsov Stanislav_Frontend developer_CV.pdf'; // Filename when downloading
    link.target = '_blank';

    // Add element to DOM, click it and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = [
    {
      label: 'GitHub',
      href: process.env.NEXT_PUBLIC_LINK_GITHUB,
      icon: Github
    },
    {
      label: 'LinkedIn',
      href: process.env.NEXT_PUBLIC_LINK_LINKEDIN,
      icon: Linkedin
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-900 pt-20 pb-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium">
                <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mr-2 animate-pulse" />
                Available for new opportunities
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]"
              >
                <span className="gradient-text">Full-Stack</span>
                <br />
                <span className="text-gray-900 dark:text-white">Developer</span>
              </motion.h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                Crafting digital experiences with modern technologies.
                Passionate about creating scalable, user-friendly applications
                that make a difference.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="button-primary flex items-center justify-center space-x-3"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadCV}
                className="button-secondary flex items-center justify-center space-x-3"
              >
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </motion.button>

              {/* Social Links */}
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 group"
                >
                  <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-gray-200 dark:border-gray-700"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-gradient-to-r group-hover:from-teal-500/20 group-hover:via-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"
                  >
                    <stat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    className="space-y-1"
                  >
                    <div className="text-xl font-bold gradient-text">
                      {counts[Object.keys(counts)[index]]}
                      {stat.suffix}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col items-center lg:items-end space-y-8"
          >
            <div className="relative">
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              >
                React
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              >
                NEXT.js
              </motion.div>

              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-80 h-80 lg:w-96 lg:h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gradient-to-r from-teal-500/20 to-blue-500/20">
                  <Image
                    src="/avatar.jpg"
                    alt="Stanislav Krivtsoff"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 384px"
                  />
                </div>
              </motion.div>
            </div>

            {/* Name */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-right leading-[1.1]"
            >
              <span className="text-gray-900 dark:text-white">Stanislav</span>
              <br />
              <span className="gradient-text text-4xl sm:text-5xl lg:text-6xl">
                Krivtsov
              </span>
            </motion.h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
