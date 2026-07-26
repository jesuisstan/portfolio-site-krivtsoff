import type { CSSProperties, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface ShineBorderProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of the border in pixels. */
  borderWidth?: number;
  /** Duration of one full sweep, in seconds. */
  duration?: number;
  /** Shine color(s); pass design tokens such as `var(--primary)`. */
  shineColor?: string | string[];
}

/** Animated gradient border overlay; the parent must be `relative overflow-hidden` and carry its own radius. */
const ShineBorder = ({
  borderWidth = 1,
  duration = 14,
  shineColor = 'var(--primary)',
  className,
  style,
  ...props
}: ShineBorderProps) => (
  <div
    aria-hidden="true"
    // Inline styles parameterize the custom properties, gradient and mask the effect is built from.
    style={
      {
        '--border-width': `${borderWidth}px`,
        '--duration': `${duration}s`,
        backgroundImage: `radial-gradient(transparent,transparent, ${
          Array.isArray(shineColor) ? shineColor.join(',') : shineColor
        },transparent,transparent)`,
        backgroundSize: '300% 300%',
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        padding: 'var(--border-width)',
        ...style
      } as CSSProperties
    }
    className={cn(
      'pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine',
      className
    )}
    {...props}
  />
);

export default ShineBorder;
