'use client';

import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Briefcase,
  Clock,
  Download,
  FolderOpen,
  Github,
  Linkedin
} from 'lucide-react';
import Image from 'next/image';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pb-12 pt-20 dark:bg-gray-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-20 h-72 w-72 animate-float rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-3xl" />
        <div
          className="absolute bottom-20 right-10 h-96 w-96 animate-float rounded-full bg-purple-500/20 blur-3xl"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform animate-float rounded-full bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 blur-3xl"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
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
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 px-4 py-2 text-sm font-medium text-teal-600 dark:text-teal-400">
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-teal-500 to-blue-500" />
                Available for new opportunities
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                <span className="gradient-text">Full-Stack</span>
                <br />
                <span className="text-gray-900 dark:text-white">Developer</span>
              </motion.h1>

              <p className="max-w-lg text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
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
                <span>Let&apos;s Talk</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadCV}
                className="button-secondary flex items-center justify-center space-x-3"
              >
                <Download className="h-5 w-5" />
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
                  className="group rounded-xl bg-gray-200 p-3 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <social.icon className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400" />
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-10 dark:border-gray-700 md:grid-cols-4"
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
                  className="group text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-teal-500/20 group-hover:via-blue-500/20 group-hover:to-purple-500/20"
                  >
                    <stat.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    className="space-y-1"
                  >
                    <div className="gradient-text text-xl font-bold">
                      {counts[Object.keys(counts)[index]]}
                      {stat.suffix}
                    </div>
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
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
            className="relative flex flex-col items-center space-y-8 lg:items-end"
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
                className="absolute -right-6 -top-6 flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-bold text-white"
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
                className="absolute -bottom-6 -left-6 flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-sm font-bold text-white"
              >
                NEXT.js
              </motion.div>

              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-80 w-80 lg:h-96 lg:w-96"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-purple-500/20 blur-xl" />
                <div className="border-gradient-to-r relative h-full w-full overflow-hidden rounded-full border-4 from-teal-500/20 to-blue-500/20">
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
              className="text-center text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-right lg:text-5xl"
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
