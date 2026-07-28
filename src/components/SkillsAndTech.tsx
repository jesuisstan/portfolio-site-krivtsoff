'use client';

import { Fragment, useEffect, useRef, useState } from 'react';

import type { Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

import { buildOrbitRings, orbitBoxSize } from '@/components/skills-orbit';
import OrbitingCircles from '@/components/ui/orbiting-circles';
import ToggleGroup, { ToggleGroupItem } from '@/components/ui/toggle-group';
import type { TechnologyFilter } from '@/constants/technologies';
import { categories, technologies } from '@/constants/technologies';
import { FILTER_CHIP_CLASS } from '@/lib/filter-chip';
import { cn } from '@/lib/utils';

const NAV_HEIGHT = 64;
const SECTION_PADDING_BOTTOM = 48;
const ORBIT_MIN_SIZE = 300;

/** Icon diameter follows the measured orbit, not the viewport. */
const slotSizeFor = (orbitSize: number): number => {
  if (orbitSize < 340) return 28;
  if (orbitSize < 560) return 36;
  return 44;
};

/** Skills section rendering the technologies as an orbital system, filtered by category. */
const SkillsAndTech = () => {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState<TechnologyFilter>('All');
  const [frame, setFrame] = useState({ width: 0, available: 0 });

  // Measured on a full-width wrapper rather than the orbit itself, whose own size is what we compute.
  // `available` is the leftover viewport height once the nav and everything above the orbit is taken
  // out — read from layout, because the filter wraps to a second row at narrow widths.
  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const sync = () => {
      const headerHeight =
        node.offsetTop - (sectionRef.current?.offsetTop ?? 0);
      const width = node.clientWidth;
      const available =
        window.innerHeight - NAV_HEIGHT - headerHeight - SECTION_PADDING_BOTTOM;

      setFrame((previous) =>
        previous.width === width && previous.available === available
          ? previous
          : { width, available }
      );
    };
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(node);
    window.addEventListener('resize', sync);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, []);

  const filteredTechnologies =
    activeCategory === 'All'
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
      className="bg-muted/30 py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tech Stack Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-6 text-center"
        >
          <motion.h2
            id="skills-heading"
            variants={itemVariants}
            className="mb-4 text-4xl font-bold text-foreground lg:text-5xl"
          >
            <span className="text-primary">Skills</span> & Technologies
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl"
          >
            Tools I&apos;ve worked with hands-on — and the list keeps growing.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <ToggleGroup
            type="single"
            variant="outline"
            spacing={2}
            value={activeCategory}
            onValueChange={(value) => {
              if (value) setActiveCategory(value as TechnologyFilter);
            }}
            aria-label="Filter technologies by category"
            className="w-full flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <ToggleGroupItem
                key={category}
                value={category}
                className={FILTER_CHIP_CLASS}
              >
                {category}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </motion.div>

        {/* Orbital System */}
        <div ref={frameRef} className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ width: orbitSize, height: orbitSize }}
            // `flex` centring is load-bearing: it is what puts each absolutely positioned orbit slot
            // at the centre before the keyframes translate it out to its radius.
            className="relative mx-auto flex items-center justify-center select-none"
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
                {activeCategory === 'All' ? 'technologies' : activeCategory}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsAndTech;
