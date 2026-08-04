'use client';

import { useEffect, useRef, useState } from 'react';

import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

import { CURTAIN_PEEK_PX, CURTAIN_QUERY } from '@/lib/curtain';
import { useMediaQuery } from '@/lib/media-query';
import { cn } from '@/lib/utils';

interface CurtainStageProps {
  /** The page's last section. */
  children: ReactNode;
}

/**
 * Locks the last section against the footer curtain's peek strip while the scroll the curtain rides on
 * runs out beneath it, so the page reads as finished there instead of scrolling on into the panel.
 * @param props The section to lock.
 * @returns A sticky stage over the curtain's travel above `md`, or the section in plain flow.
 */
const CurtainStage = ({ children }: CurtainStageProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isPinnable = useMediaQuery(CURTAIN_QUERY);

  const stageRef = useRef<HTMLDivElement>(null);
  const [pinTop, setPinTop] = useState<number | null>(null);

  const enabled = isPinnable && !prefersReducedMotion;

  // `sticky` can only ever push an element *down* past its flow position, and only through `top` — a
  // `bottom` offset shifts it the other way and would drag the section up the page. Parking the section's
  // bottom edge on the strip therefore means a `top` of viewport minus its own height, which no CSS
  // length can express. It goes negative whenever the section is taller than the stage, which is what
  // lets a long section scroll through in full before it locks.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !enabled) return;

    const sync = () => {
      const next =
        window.innerHeight -
        CURTAIN_PEEK_PX -
        stage.getBoundingClientRect().height;

      setPinTop((previous) => (previous === next ? previous : next));
    };
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(stage);
    window.addEventListener('resize', sync);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [enabled]);

  const isPinned = enabled && pinTop !== null;

  return (
    <div>
      <div
        ref={stageRef}
        className={cn(isPinned && 'sticky')}
        style={isPinned ? { top: `${pinTop}px` } : undefined}
      >
        {children}
      </div>
      {/* The curtain's travel. It has to be an in-flow spacer rather than a margin on `<main>`: a margin
          falls outside the sticky containing block, leaving the stage nothing to be held against. */}
      <div aria-hidden className="hidden h-svh motion-safe:md:block" />
    </div>
  );
};

export default CurtainStage;
