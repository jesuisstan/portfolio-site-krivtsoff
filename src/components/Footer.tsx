'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

import Button from '@/components/ui/button';
import Separator from '@/components/ui/separator';

/** Site footer with branding and a scroll-to-top control. */
const Footer = () => {
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  K
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                krivtsoff.develop()
              </span>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Frontend developer focused on product UIs, React/Next.js, and
              clear, maintainable web experiences.
            </p>
          </motion.div>

          {/* Scroll to Top Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="shrink-0"
          >
            <Button
              variant="outline"
              size="icon-lg"
              className="size-12"
              aria-label="Back to top"
              onClick={scrollToTop}
            >
              <ArrowUp className="size-6" />
            </Button>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Separator className="mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Stanislav Krivtsov. </span>
            <a
              href="https://github.com/jesuisstan/portfolio-site-krivtsoff"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-sm underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              Made
            </a>
            <span> with</span>
            <motion.span
              animate={
                prefersReducedMotion ? undefined : { scale: [1, 1.2, 1] }
              }
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-flex"
            >
              <Heart
                aria-hidden
                className="size-4 fill-current text-primary-alt"
              />
            </motion.span>
            <span>in Paris</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
