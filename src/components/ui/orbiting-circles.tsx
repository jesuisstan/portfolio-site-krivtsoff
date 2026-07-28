import { Children } from 'react';

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface OrbitingCirclesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  /** Reverses the travel direction. */
  reverse?: boolean;
  /** Duration of one lap, in seconds, before `speed` divides it. */
  duration?: number;
  /** Orbit radius in pixels. */
  radius?: number;
  /** Renders the hairline circle the children travel along. */
  path?: boolean;
  /** Diameter of each orbiting slot, in pixels. */
  iconSize?: number;
  /** Divides `duration`; 2 makes one lap twice as fast. */
  speed?: number;
}

/** Distributes its children evenly around a circular path and orbits them; parent must be `relative`. */
const OrbitingCircles = ({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) => {
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-border stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {Children.map(children, (child, index) => {
        const angle = (360 / Children.count(children)) * index;
        return (
          <div
            // Inline styles parameterize the custom properties the `orbit` keyframes read.
            style={
              {
                '--orbit-duration': calculatedDuration,
                '--orbit-radius': radius,
                '--angle': angle,
                '--icon-size': `${iconSize}px`
              } as CSSProperties
            }
            className={cn(
              'absolute flex size-(--icon-size) animate-orbit transform-gpu items-center justify-center rounded-full',
              // Paused rather than removed: the 0% frame is what places each child on the ring, so
              // `animate-none` would collapse the whole orbit into the centre.
              'motion-reduce:[animation-play-state:paused]',
              { '[animation-direction:reverse]': reverse },
              className
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
};

export default OrbitingCircles;
