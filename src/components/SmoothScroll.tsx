'use client';

import { useReducedMotion } from 'framer-motion';
import type { LenisOptions } from 'lenis';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';

const LENIS_OPTIONS: LenisOptions = {
  // Lerp rather than a fixed duration: the glide is frame-rate normalised and ends where the
  // gesture ends, which is what separates momentum from a canned animation.
  lerp: 0.1,
  // Touch already carries the platform's own inertia; syncing it only costs the native feel.
  syncTouch: false
};

/**
 * Mounts the site-wide scroll inertia over the real scroll position.
 * @returns The Lenis root, or nothing at all when the visitor has asked for reduced motion.
 */
const SmoothScroll = () => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return <ReactLenis root options={LENIS_OPTIONS} />;
};

export default SmoothScroll;
