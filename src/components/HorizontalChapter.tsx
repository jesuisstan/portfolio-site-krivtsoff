'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import type { MotionStyle } from 'framer-motion';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { useMediaQuery } from '@/lib/media-query';
import { useSmoothScrollTo } from '@/lib/smooth-scroll';
import { cn } from '@/lib/utils';

const DESKTOP_QUERY = '(min-width: 1024px)';

// Overdamped on purpose (damping ratio ~1.12): the track should trail the wheel, never bounce past
// its panel. `damping / stiffness` is the trail the track keeps at speed — 0.125s, tight enough that
// a fast flick still reads as momentum rather than as the content catching up.
const TRACK_SPRING = { stiffness: 320, damping: 40, restDelta: 0.001 };

// How far into the first panel the hint stops offering a jump the visitor has already made.
const HINT_EXIT_RATIO = 0.5;

// `mx-auto max-w-7xl px-8` resolved as a plain length, published to the panels. A panel narrower than
// the viewport cannot get that offset from `mx-auto`, and its heading has to sit on the same left edge
// as every other section's.
const PANEL_GUTTER =
  '[--panel-gutter:max(2rem,calc((var(--panel-width)-80rem)/2+2rem))]';

/**
 * Class list for a chapter's cover panel: a column as wide as its own text rather than a whole screen,
 * so the first content panel is already on screen when the chapter starts travelling.
 */
export const COVER_PANEL_CLASS =
  'flex shrink-0 flex-col justify-center pr-12 pl-[var(--panel-gutter)]';

type TrackStyle = MotionStyle & Record<'--panel-width', string>;

interface ChapterControls {
  scrollToPanel: (index: number) => void;
  pastFirstPanel: boolean;
}

const ChapterContext = createContext<ChapterControls | null>(null);

/**
 * Reports whether a horizontal chapter travels sideways on the current viewport.
 * @returns True once mounted at `lg` or wider with motion allowed; false during SSR and hydration.
 */
export const useHorizontalChapter = (): boolean => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const prefersReducedMotion = useReducedMotion();

  return isDesktop && !prefersReducedMotion;
};

interface ScrollHintProps {
  className?: string;
}

/** Chevron button that pans its chapter to the next panel; fades out once that panel is reached. */
export const ScrollHint = ({ className }: ScrollHintProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isHorizontal = useHorizontalChapter();
  const controls = useContext(ChapterContext);
  const t = useTranslations('common');

  if (!isHorizontal || !controls) return null;

  const { pastFirstPanel, scrollToPanel } = controls;

  return (
    <motion.button
      type="button"
      onClick={() => scrollToPanel(1)}
      aria-label={t('scroll-hint')}
      // `inert` rather than `aria-hidden` + `tabIndex`: it also drops focus, which those two leave
      // sitting on a control the visitor can no longer see.
      inert={pastFirstPanel}
      animate={{ opacity: pastFirstPanel ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
        'size-11 cursor-pointer text-primary hover:text-accent-foreground',
        pastFirstPanel && 'pointer-events-none',
        className
      )}
    >
      <motion.span
        animate={prefersReducedMotion ? undefined : { x: [0, 12, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex"
      >
        <ChevronRight className="size-8" strokeWidth={1.5} />
      </motion.span>
    </motion.button>
  );
};

interface HorizontalChapterProps {
  /** Panels of the chapter. Size full-bleed ones `w-[var(--panel-width)]`, cards a fixed width. */
  children: ReactNode;
  className?: string;
  trackClassName?: string;
}

/**
 * Turns a section into a horizontally travelling chapter driven by its own vertical scroll progress.
 * @param props Panels to lay out plus optional classes for the outer container and the track.
 * @returns A pinned sideways track at `lg` and above, or a plain vertical stack otherwise.
 */
const HorizontalChapter = ({
  children,
  className,
  trackClassName
}: HorizontalChapterProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const enabled = useHorizontalChapter();
  const scrollTo = useSmoothScrollTo();
  const [metrics, setMetrics] = useState({ travel: 0, panelWidth: 0 });
  const [pastFirstPanel, setPastFirstPanel] = useState(false);

  // Panels are sized from the container rather than `100vw`, which counts the scrollbar and would
  // push the document sideways in the stacked branch.
  useEffect(() => {
    const track = trackRef.current;
    const outer = outerRef.current;
    if (!track || !outer) return;

    const sync = () => {
      const panelWidth = outer.clientWidth;
      const travel = Math.max(0, track.scrollWidth - panelWidth);

      setMetrics((previous) =>
        previous.travel === travel && previous.panelWidth === panelWidth
          ? previous
          : { travel, panelWidth }
      );
    };
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(track);
    observer.observe(outer);
    window.addEventListener('resize', sync);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [enabled]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end']
  });
  // Springing the pixel offset rather than the 0–1 progress keeps `restDelta` a sub-pixel tolerance,
  // so the last panel still settles flush with the viewport edge.
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -metrics.travel]),
    TRACK_SPRING
  );

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const firstPanel = trackRef.current?.children[0];
    if (!(firstPanel instanceof HTMLElement) || metrics.travel === 0) return;

    const exitAt = (firstPanel.offsetWidth * HINT_EXIT_RATIO) / metrics.travel;
    setPastFirstPanel(progress >= exitAt);
  });

  // Travel maps 1:1 with vertical scroll, so a panel's own layout offset is the scroll distance to it.
  const scrollToPanel = useCallback(
    (index: number) => {
      const outer = outerRef.current;
      const panel = trackRef.current?.children[index];
      if (!outer || !(panel instanceof HTMLElement)) return;

      const chapterTop = outer.getBoundingClientRect().top + window.scrollY;
      scrollTo(chapterTop + panel.offsetLeft);
    },
    [scrollTo]
  );

  const controls = useMemo<ChapterControls>(
    () => ({ scrollToPanel, pastFirstPanel }),
    [scrollToPanel, pastFirstPanel]
  );

  const panelWidth = enabled
    ? metrics.panelWidth > 0
      ? `${metrics.panelWidth}px`
      : '100vw'
    : '100%';
  const trackStyle: TrackStyle = enabled
    ? { x, '--panel-width': panelWidth }
    : { '--panel-width': panelWidth };

  return (
    <div
      ref={outerRef}
      className={cn('relative', className)}
      style={
        enabled ? { height: `calc(100svh + ${metrics.travel}px)` } : undefined
      }
    >
      <div
        className={cn(enabled && 'sticky top-0 h-svh overflow-hidden pt-16')}
      >
        <motion.div
          ref={trackRef}
          style={trackStyle}
          className={cn(
            enabled ? cn('flex h-full w-max', PANEL_GUTTER) : 'flex flex-col',
            trackClassName
          )}
        >
          <ChapterContext.Provider value={controls}>
            {children}
          </ChapterContext.Provider>
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalChapter;
