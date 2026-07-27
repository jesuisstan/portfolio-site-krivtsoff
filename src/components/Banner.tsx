'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import type { BannerStatCounts } from '@/components/banner-content';
import { bannerSocialLinks, bannerStats } from '@/components/banner-content';
import Badge from '@/components/ui/badge';
import BorderBeam from '@/components/ui/border-beam';
import Button from '@/components/ui/button';
import { Particles } from '@/components/ui/particles';
import Separator from '@/components/ui/separator';

const countsAtProgress = (progress: number): BannerStatCounts => ({
  projects: Math.floor(bannerStats[0].number * progress),
  experience: Math.floor(bannerStats[1].number * progress),
  hours: Math.floor(bannerStats[2].number * progress),
  certifications: Math.floor(bannerStats[3].number * progress)
});

/** Hero section with intro copy, CTAs, animated stat counters, and avatar. */
const Banner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const [counts, setCounts] = useState<BannerStatCounts>(countsAtProgress(0));

  const { setTheme, resolvedTheme } = useTheme();

  const color = useMemo(
    () => (resolvedTheme === 'dark' ? '#ffffff' : '#000000'),
    [resolvedTheme]
  );

  // Reduced motion skips the count-up entirely and renders the final values.
  const displayCounts = prefersReducedMotion ? countsAtProgress(1) : counts;

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const steps = 60;
    const stepDuration = 2000 / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setCounts(countsAtProgress(currentStep / steps));
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isInView, prefersReducedMotion]);

  const downloadCV = () => {
    // Create link to PDF file in public folder
    const cvUrl =
      process.env.NEXT_PUBLIC_LINK_CV_DOWNLOAD ||
      '/Krivtsov Stanislav_Frontend developer_CV.pdf';

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

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pb-12 pt-20"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      {/* Background Elements */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-20 h-72 w-72 animate-float rounded-full bg-primary/15 blur-3xl motion-reduce:animate-none" />
        <div className="absolute bottom-20 right-10 h-96 w-96 animate-float rounded-full bg-primary/10 blur-3xl [animation-delay:1s] motion-reduce:animate-none" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-primary/5 blur-3xl [animation-delay:2s] motion-reduce:animate-none" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
                <span
                  aria-hidden
                  className="size-2 animate-pulse rounded-full bg-primary-alt motion-reduce:animate-none"
                />
                Available for new opportunities
              </Badge>

              <motion.h1
                id="home-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                <span className="text-primary">Frontend</span>
                <br />
                Developer
              </motion.h1>

              <p className="max-w-lg text-lg text-muted-foreground sm:text-xl">
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
              <Button size="lg" className="h-11" onClick={scrollToContact}>
                Let&apos;s Talk
                <ArrowRight />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="relative h-11 overflow-hidden"
                onClick={downloadCV}
              >
                <Download />
                Download CV
                {/* Decorative infinite loop — omitted outright under reduced motion. */}
                {!prefersReducedMotion && (
                  <BorderBeam
                    size={60}
                    initialOffset={20}
                    transition={{ type: 'spring', stiffness: 26, damping: 20 }}
                    colorFrom="var(--destructive)"
                    colorTo="var(--primary-alt)"
                  />
                )}
              </Button>

              {/* Social Links */}
              {bannerSocialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="icon-lg"
                    className="size-11"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="size-5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-10"
            >
              <Separator />
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {bannerStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <stat.icon aria-hidden className="size-5 text-primary" />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                      className="space-y-1"
                    >
                      <div className="text-xl font-bold text-foreground">
                        {displayCounts[stat.key]}
                        {stat.suffix}
                      </div>
                      <div className="text-xs font-medium text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
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
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -10, 0], rotate: [0, 5, 0] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -right-6 -top-6 flex size-20 flex-col items-center justify-center rounded-xl bg-primary text-center text-sm font-bold text-primary-foreground"
              >
                React{'\n'}
                JS/TS
              </motion.div>

              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, 10, 0], rotate: [0, -5, 0] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 flex size-20 flex-col items-center justify-center rounded-xl bg-primary-alt text-center text-sm font-bold text-primary-alt-foreground"
              >
                NEXT.js{'\n'}EXPO
              </motion.div>

              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-80 w-80 lg:h-96 lg:w-96"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                />
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-primary/30">
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
              className="text-center text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl lg:text-right lg:text-5xl"
            >
              Stanislav
              <br />
              <span className="text-4xl text-primary sm:text-5xl lg:text-6xl">
                Krivtsov
              </span>
            </motion.h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
