'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="container-custom px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="mb-4 flex items-center justify-center space-x-2 md:justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
                <span className="text-sm font-bold text-white">K</span>
              </div>
              <span className="gradient-text text-xl font-bold">
                krivtsoff.develop()
              </span>
            </div>
            <p className="max-w-md text-sm text-gray-600 dark:text-gray-300">
              Full-stack developer passionate about creating innovative digital
              experiences and building scalable web applications.
            </p>
          </motion.div>

          {/* Scroll to Top Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-shrink-0"
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 p-4 shadow-md transition-all duration-300 hover:from-teal-500/20 hover:to-blue-500/20 hover:shadow-lg"
            >
              <ArrowUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex justify-center border-t border-gray-200 pt-8 dark:border-gray-700"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span>© {currentYear} Stanislav Krivtsov. </span>
            <a
              href="https://github.com/jesuisstan/portfolio-site-krivtsoff"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Made
            </a>
            <span> with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 fill-current text-red-500" />
            </motion.div>
            <span>in Paris</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
