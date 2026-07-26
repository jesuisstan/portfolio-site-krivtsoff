'use client';

// Magic UI ships this importing `motion/react`; re-pointed to `framer-motion` on purpose — same
// codebase under the old name, and installing both would ship two animation runtimes.
// Expect a `shadcn diff` mismatch here.

import type { MotionStyle, Transition } from 'framer-motion';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

interface BorderBeamProps {
  /** Length of the travelling highlight in pixels; also sets the corner radius of its path. */
  size?: number;
  /** Duration of one lap, in seconds. Ignored when `transition` supplies a spring. */
  duration?: number;
  /** Offsets the animation start, in seconds. */
  delay?: number;
  /** Leading gradient stop; pass a design token such as `var(--primary)`. */
  colorFrom?: string;
  /** Trailing gradient stop; pass a design token such as `var(--primary-alt)`. */
  colorTo?: string;
  /** Motion transition applied to the beam, merged over the looping defaults. */
  transition?: Transition;
  /** Extra classes for the moving gradient element. */
  className?: string;
  /** Extra styles for the moving gradient element. */
  style?: CSSProperties;
  /** Reverses the travel direction. */
  reverse?: boolean;
  /** Starting position along the border, 0-100. */
  initialOffset?: number;
  /** Beam thickness in pixels. */
  borderWidth?: number;
}

/** Decorative beam that travels along its parent's border; the parent must be `relative overflow-hidden`. */
const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = 'var(--primary)',
  colorTo = 'var(--primary-alt)',
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1
}: BorderBeamProps) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
    // Inline styles parameterize the custom properties, gradient stops and offset path.
    style={
      {
        '--border-beam-width': `${borderWidth}px`
      } as CSSProperties
    }
  >
    <motion.div
      className={cn(
        'absolute aspect-square',
        'bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent',
        className
      )}
      style={
        {
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          ...style
        } as MotionStyle
      }
      initial={{ offsetDistance: `${initialOffset}%` }}
      animate={{
        offsetDistance: reverse
          ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
          : [`${initialOffset}%`, `${100 + initialOffset}%`]
      }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration,
        delay: -delay,
        ...transition
      }}
    />
  </div>
);

export default BorderBeam;
