'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';

import Button from '@/components/ui/button';
import { Particles } from '@/components/ui/particles';
import Separator from '@/components/ui/separator';
import { useParticleColor } from '@/lib/particle-color';
import { socialLinks } from '@/lib/social-links';

/** Site footer with branding and the social links. */
const Footer = () => {
  const prefersReducedMotion = useReducedMotion();
  const particleColor = useParticleColor();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-muted/30 select-none">
      {/* Decorative drifting field — omitted outright under reduced motion. */}
      {!prefersReducedMotion && (
        <Particles
          className="absolute inset-0 z-0"
          quantity={50}
          ease={80}
          color={particleColor}
          refresh
        />
      )}
      {/* `relative z-10` keeps the z-0 particle canvas from painting over this in-flow content. */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="shrink-0 text-center md:text-right"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Follow Me
            </h3>
            <div className="flex justify-center gap-4 md:justify-end">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="outline"
                  size="icon-lg"
                  className="size-12"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="size-6" />
                  </a>
                </Button>
              ))}
            </div>
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
