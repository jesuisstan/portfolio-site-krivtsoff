'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Instagram
} from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      const navHeight = 64; // h-16 = 64px
      const elementPosition = contactSection.offsetTop - navHeight;

      try {
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      } catch (error) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 64; // h-16 = 64px
      const elementPosition = element.offsetTop - navHeight;

      try {
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      } catch (error) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const socialLinks = [
    {
      icon: Github,
      href: process.env.NEXT_PUBLIC_LINK_GITHUB,
      label: 'GitHub',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      href: process.env.NEXT_PUBLIC_LINK_LINKEDIN,
      label: 'LinkedIn',
      color: 'hover:text-teal-400'
    },
    {
      icon: Instagram,
      href: process.env.NEXT_PUBLIC_LINK_INSTAGRAM,
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
    {
      icon: Mail,
      href: '#contact',
      label: 'Email',
      color: 'hover:text-red-400',
      onClick: scrollToContact
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-xl gradient-text">
                krivtsoff.develop()
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md">
              Full-stack developer passionate about creating innovative digital
              experiences and building scalable web applications.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm text-left"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social, index) => (
                <motion.button
                  key={social.label}
                  onClick={
                    social.onClick || (() => window.open(social.href, '_blank'))
                  }
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 ${social.color}`}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span>© {currentYear} Stanislav Krivtsoff. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>in Paris</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-lg bg-gradient-to-r from-teal-500/10 to-blue-500/10 hover:from-teal-500/20 hover:to-blue-500/20 transition-colors duration-200"
          >
            <ArrowUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
