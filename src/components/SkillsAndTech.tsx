'use client';

import { Fragment, useEffect, useRef, useState } from 'react';

import type { Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import HorizontalChapter, {
  COVER_PANEL_CLASS,
  panelScrollTarget,
  ScrollHint,
  useHorizontalChapter
} from '@/components/HorizontalChapter';
import { buildOrbitRings, orbitBoxSize } from '@/components/skills-orbit';
import OrbitingCircles from '@/components/ui/orbiting-circles';
import ToggleGroup, { ToggleGroupItem } from '@/components/ui/toggle-group';
import type { TechnologyFilter } from '@/constants/technologies';
import { categories, technologies } from '@/constants/technologies';
import { FILTER_CHIP_CLASS } from '@/lib/filter-chip';
import { useSmoothScrollTo } from '@/lib/smooth-scroll';
import { cn } from '@/lib/utils';

const NAV_HEIGHT = 64;
const SECTION_PADDING_BOTTOM = 48;
const ORBIT_MIN_SIZE = 300;
// Kept clear above and below the orbit box. Withheld from the box's own size budget and then handed
// back by centring the box in its region, so the margin is real rather than clipped off the rings.
const ORBIT_GUTTER = 32;

const PANEL_CLASS = 'flex w-[var(--panel-width)] shrink-0 flex-col';
const CONTAINER_CLASS = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

/** Icon diameter follows the measured orbit, not the viewport. */
const slotSizeFor = (orbitSize: number): number => {
  if (orbitSize < 340) return 28;
  if (orbitSize < 560) return 36;
  return 44;
};

/** Skills section rendering the technologies as an orbital system, filtered by category. */
const SkillsAndTech = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitPanelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Observed on the section, which spans the chapter's whole travel: the cover panel it used to watch
  // is translated off-screen for the rest of the track, so an entry that skips the start never latched.
  const isInView = useInView(sectionRef, { once: true });
  const isHorizontal = useHorizontalChapter();
  const [activeCategory, setActiveCategory] = useState<TechnologyFilter>('all');
  const scrollTo = useSmoothScrollTo();
  const [frame, setFrame] = useState({ width: 0, available: 0 });
  const t = useTranslations('skills');

  // Measured on the region that centres the orbit, not the orbit itself, whose size is what we compute:
  // the region's top is fixed by the filter above it, so it cannot feed the box's height back in.
  // `available` is the leftover viewport height once the nav, everything above the orbit and the two
  // gutters are taken out — read from layout, because the filter wraps to a second row at narrow
  // widths. The heading counts as "above the orbit" only while the section is stacked; once the
  // chapter travels, the orbit's own panel is what the pinned viewport shows.
  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const sync = () => {
      const reference = isHorizontal
        ? orbitPanelRef.current
        : sectionRef.current;
      if (!reference) return;

      const headerHeight =
        node.getBoundingClientRect().top -
        reference.getBoundingClientRect().top;
      const width = node.clientWidth;
      const available =
        window.innerHeight -
        NAV_HEIGHT -
        headerHeight -
        SECTION_PADDING_BOTTOM -
        ORBIT_GUTTER * 2;

      setFrame((previous) =>
        previous.width === width && previous.available === available
          ? previous
          : { width, available }
      );
    };
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(node);
    if (orbitPanelRef.current) observer.observe(orbitPanelRef.current);
    window.addEventListener('resize', sync);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [isHorizontal]);

  // The chips are reachable while the chapter has only panned far enough to show part of the orbit, so
  // a selection also travels to it: filtering something the visitor cannot see is not a result.
  const selectCategory = (category: TechnologyFilter) => {
    setActiveCategory(category);

    const panel = orbitPanelRef.current;
    if (!isHorizontal || !panel) return;

    const target = panelScrollTarget(panel);
    if (target !== null) scrollTo(target);
  };

  const filteredTechnologies =
    activeCategory === 'all'
      ? technologies
      : technologies.filter((tech) => tech.categories.includes(activeCategory));

  const orbitSize = Math.min(
    frame.width,
    orbitBoxSize(filteredTechnologies.length),
    Math.max(ORBIT_MIN_SIZE, frame.available)
  );
  const slotSize = slotSizeFor(orbitSize);
  // Dropped only where the orbit is phone-narrow; a small category has plenty of arc for a label.
  const showLabels = orbitSize >= 340;
  // Keep the widest ring inside the box: half the box, less the icon's own radius and label room.
  const outerRadius = Math.max(0, orbitSize / 2 - slotSize / 2 - 16);
  const rings = buildOrbitRings(filteredTechnologies, outerRadius);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-muted/30"
    >
      <HorizontalChapter>
        {/* Cover panel */}
        <div
          className={cn(
            isHorizontal ? COVER_PANEL_CLASS : PANEL_CLASS,
            'justify-center pt-12'
          )}
        >
          <div className={isHorizontal ? 'max-w-3xl' : CONTAINER_CLASS}>
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={containerVariants}
              className={cn('mb-6', isHorizontal ? 'text-left' : 'text-center')}
            >
              <motion.h2
                id="skills-heading"
                variants={itemVariants}
                className="mb-4 text-4xl font-bold text-foreground lg:text-5xl"
              >
                {t.rich('heading', {
                  accent: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  )
                })}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className={cn(
                  'max-w-3xl text-lg text-muted-foreground sm:text-xl',
                  isHorizontal ? 'mr-auto' : 'mx-auto'
                )}
              >
                {t('subtitle')}
              </motion.p>
            </motion.div>
            <ScrollHint className="mt-10" />
          </div>
        </div>

        {/* Orbit panel. While pinned it starts below the nav, so the filter needs its own clearance:
            parked directly under the bar the chips read as a second toolbar rather than as this
            section's control. */}
        <div
          ref={orbitPanelRef}
          className={cn(PANEL_CLASS, 'pb-12', isHorizontal && 'pt-8')}
        >
          <div className={cn(CONTAINER_CLASS, 'flex flex-1 flex-col')}>
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              // Tighter against the orbit while pinned: the box keeps its own gutter, so the stacked
              // layout still needs the full margin to separate the filter from what it filters.
              className={cn(
                'flex justify-center',
                isHorizontal ? 'mb-2' : 'mb-8'
              )}
            >
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={2}
                value={activeCategory}
                onValueChange={(value) => {
                  if (value) selectCategory(value as TechnologyFilter);
                }}
                aria-label={t('filter-aria')}
                className="w-full flex-wrap justify-center gap-2"
              >
                {categories.map((category) => (
                  <ToggleGroupItem
                    key={category}
                    value={category}
                    className={FILTER_CHIP_CLASS}
                  >
                    {t(`categories.${category}`)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </motion.div>

            {/* Orbital System. `min-h-0` stops an oversized box from growing this region, which would
                feed its own height back into the measurement above. */}
            <div
              ref={frameRef}
              className="flex min-h-0 w-full flex-1 items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ width: orbitSize, height: orbitSize }}
                // `flex` centring is load-bearing: it is what puts each absolutely positioned orbit
                // slot at the centre before the keyframes translate it out to its radius.
                className="relative flex shrink-0 items-center justify-center select-none"
              >
                {/* Rendered only once measured — a zero radius would stack every icon in the centre. */}
                {/* Keyed on the filter so every slot remounts: `--angle` is only the animation's starting
                    phase, so a slot React carries over keeps its old elapsed time and lands out of step
                    with the freshly mounted ones. Remounting restarts every clock at zero. */}
                <Fragment key={activeCategory}>
                  {orbitSize > 0 &&
                    rings.map((ring, index) => (
                      <OrbitingCircles
                        key={index}
                        radius={ring.radius}
                        duration={ring.duration}
                        reverse={ring.reverse}
                        iconSize={slotSize}
                        className="hover:z-10 hover:[animation-play-state:paused]"
                      >
                        {ring.items.map((tech) => (
                          <div
                            key={tech.name}
                            className={cn(
                              'relative flex size-full items-center justify-center rounded-full border border-border shadow-ambient transition-colors hover:border-primary/40',
                              tech.plate ?? 'bg-logo-plate'
                            )}
                          >
                            <Image
                              src={tech.icon}
                              alt={tech.name}
                              fill
                              sizes="44px"
                              className="rounded-full object-contain p-1.5"
                            />
                            {showLabels && (
                              <span
                                aria-hidden
                                className="absolute top-[calc(100%+0.25rem)] whitespace-nowrap text-[10px] leading-none font-medium text-muted-foreground"
                              >
                                {tech.name}
                              </span>
                            )}
                          </div>
                        ))}
                      </OrbitingCircles>
                    ))}
                </Fragment>

                {/* Hub */}
                <div className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-border bg-card px-2 text-center shadow-ambient">
                  <span className="text-2xl font-bold text-primary">
                    {filteredTechnologies.length}
                  </span>
                  <span className="text-xs leading-tight font-medium text-muted-foreground">
                    {activeCategory === 'all'
                      ? t('hub-all')
                      : t(`categories.${activeCategory}`)}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </HorizontalChapter>
    </section>
  );
};

export default SkillsAndTech;
