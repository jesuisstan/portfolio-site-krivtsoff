'use client';

// Magic UI ships this importing `motion/react`; re-pointed to `framer-motion` on purpose — same
// codebase under the old name, and installing both would ship two animation runtimes.
// Expect a `shadcn diff` mismatch here.
// Upstream's focusable `role="region"` wrapper and its `rounded-xl` default are dropped: the effect
// is pointer-only, so a tab stop that does nothing is noise, and the consumer owns the shape.

import { useCallback, useMemo, useState } from 'react';

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion
} from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface Position {
  x: number;
  y: number;
}

interface LensProps {
  /** Content magnified by the lens; it is rendered twice, once plain and once inside the lens. */
  children: ReactNode;
  /** Magnification of the lensed copy; must be greater than 1. */
  zoomFactor?: number;
  /** Diameter of the lens in pixels. */
  lensSize?: number;
  /** Fixed lens position, used when `isStatic` is set. */
  position?: Position;
  /** Resting lens position shown while the pointer is away. */
  defaultPosition?: Position;
  /** Pins the lens to `position` instead of following the pointer. */
  isStatic?: boolean;
  /** Duration of the lens reveal, in seconds. */
  duration?: number;
  /** Opaque stop of the mask gradient; only its alpha matters, so pass a token. */
  lensColor?: string;
  /** Extra classes for the container that wraps `children`. */
  className?: string;
}

/** Magnifying lens that follows the pointer over its children. */
const Lens = ({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = 'var(--foreground)',
  className
}: LensProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>(position);
  const prefersReducedMotion = useReducedMotion();

  const currentPosition = useMemo(() => {
    if (isStatic) return position;
    if (defaultPosition && !isHovering) return defaultPosition;
    return mousePosition;
  }, [isStatic, position, defaultPosition, isHovering, mousePosition]);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  }, []);

  const maskImage = useMotionTemplate`radial-gradient(circle ${
    lensSize / 2
  }px at ${currentPosition.x}px ${
    currentPosition.y
  }px, ${lensColor} 100%, transparent 100%)`;

  const lensContent = useMemo(() => {
    const { x, y } = currentPosition;

    return (
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.58 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
        transition={{ duration: prefersReducedMotion ? 0 : duration }}
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          transformOrigin: `${x}px ${y}px`
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            scale: zoomFactor,
            transformOrigin: `${x}px ${y}px`
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }, [
    currentPosition,
    maskImage,
    zoomFactor,
    children,
    duration,
    prefersReducedMotion
  ]);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {isStatic || defaultPosition ? (
        lensContent
      ) : (
        <AnimatePresence mode="popLayout">
          {isHovering && lensContent}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Lens;
