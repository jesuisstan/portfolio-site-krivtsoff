'use client';

import { useRef, useState } from 'react';

import type { Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import { BarChart3, Code, Eye, Github } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import HorizontalChapter, {
  COVER_PANEL_CLASS,
  panelScrollTarget,
  ScrollHint,
  useHorizontalChapter
} from '@/components/HorizontalChapter';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Lens from '@/components/ui/lens';
import ToggleGroup, { ToggleGroupItem } from '@/components/ui/toggle-group';
import Tooltip, {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import type {
  Project,
  ProjectCategory,
  ProjectFilter
} from '@/constants/projects';
import { projects } from '@/constants/projects';
import { FILTER_CHIP_CLASS } from '@/lib/filter-chip';
import { useSmoothScrollTo } from '@/lib/smooth-scroll';
import { cn } from '@/lib/utils';

const descriptionClasses =
  'mb-4 line-clamp-3 text-left text-sm leading-relaxed text-muted-foreground';

const CONTAINER_CLASS = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const ProjectDescription = ({ description }: { description: string }) => {
  if (description.length <= 100) {
    return <p className={descriptionClasses}>{description}</p>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            descriptionClasses,
            'cursor-help rounded-sm focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50'
          )}
        >
          {description}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start" className="max-w-72">
        {description}
      </TooltipContent>
    </Tooltip>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const t = useTranslations('projects');

  return (
    <Card className="group h-full gap-0 overflow-hidden p-0 transition-colors hover:border-primary/50">
      {/* Project Image */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <Lens zoomFactor={2} lensSize={130} className="h-full w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </Lens>
        {/* Category Badge */}
        <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-1.5">
          {(Array.isArray(project.category)
            ? project.category
            : [project.category]
          ).map((category) => (
            <Badge key={category} className="bg-primary/90 backdrop-blur-xs">
              {t(`categories.${category}`)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Project Content. A column, so the actions can sit on the card's floor however tall it is. */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-xl font-bold text-card-foreground transition-colors group-hover:text-accent-foreground">
          {project.title}
        </h3>
        <ProjectDescription
          description={t(`items.${project.key}.description`)}
        />

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-md">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          {project.liveUrl && (
            <Button asChild size="sm" className="flex-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye />
                {t('live-demo')}
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild size="sm" variant="outline" className="flex-1">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code />
                {t('code')}
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const categories: ProjectFilter[] = [
  'all',
  'full-stack',
  'frontend',
  'game',
  'mobile'
];

const octoprofileUrl = `https://octoprofile.vercel.app/user?id=${process.env.NEXT_PUBLIC_GITHUB_PROFILE}`;

/** Projects section with category filtering and per-card action links. */
const Projects = () => {
  // Observed on the section rather than the header: the section is the one node both branches share,
  // and it spans the whole chapter, so the reveal latches on an entry that skips the first panel.
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [activeCategory, setActiveCategory] = useState<ProjectFilter>('all');
  const isHorizontal = useHorizontalChapter();
  const scrollTo = useSmoothScrollTo();
  const t = useTranslations('projects');

  // A filter changes the track's length, and with it the chapter's height: a visitor who is mid-pan
  // would keep a scroll offset that now points past the chapter entirely — the browser then clamps it
  // to the shortened document and lands them in a later section. Re-anchoring on the cover is both the
  // fix and the honest reading of the gesture: a new filter starts its river over. It has to happen in
  // this frame, before the track shrinks, which is why it lands immediately instead of easing there.
  const selectCategory = (category: ProjectFilter) => {
    const cover = coverRef.current;
    if (isHorizontal && cover) {
      const target = panelScrollTarget(cover);
      if (target !== null) scrollTo(target, { immediate: true });
    }

    setActiveCategory(category);
  };

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => {
          const projectCategories: ProjectCategory[] = Array.isArray(
            project.category
          )
            ? project.category
            : [project.category];
          return projectCategories.includes(activeCategory);
        });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const filter = (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={2}
      value={activeCategory}
      onValueChange={(value) => {
        if (value) selectCategory(value as ProjectFilter);
      }}
      aria-label={t('filter-aria')}
      className={cn(
        'w-full flex-wrap gap-2',
        isHorizontal ? 'justify-start' : 'justify-center'
      )}
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
  );

  const header = (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={cn('mb-12', isHorizontal ? 'text-left' : 'text-center')}
    >
      <motion.h2
        id="projects-heading"
        variants={itemVariants}
        className="mb-8 text-4xl font-bold text-foreground lg:text-5xl"
      >
        {t.rich('heading', {
          accent: (chunks) => <span className="text-primary">{chunks}</span>
        })}
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className={cn(
          'max-w-3xl text-xl text-muted-foreground',
          isHorizontal ? 'mr-auto' : 'mx-auto mb-8'
        )}
      >
        {t('subtitle')}
      </motion.p>

      {/* Stacked, the filter belongs to the header; travelling, it is held in the chapter's top bar. */}
      {!isHorizontal && (
        <motion.div variants={itemVariants} className="flex justify-center">
          {filter}
        </motion.div>
      )}
    </motion.div>
  );

  // A two-column grid rather than a row: the two labels differ in length, and a pair of section CTAs
  // reads as one control set only while they are the same size.
  const ctas = (
    <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
      <Button asChild size="lg" className="h-12 px-8 text-base">
        <a
          href={process.env.NEXT_PUBLIC_LINK_GITHUB}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="size-5" />
          {t('view-more')}
        </a>
      </Button>

      <Button
        asChild
        size="lg"
        variant="outline"
        className="h-12 px-8 text-base"
      >
        <a href={octoprofileUrl} target="_blank" rel="noopener noreferrer">
          <BarChart3 className="size-5" />
          {t('stats')}
        </a>
      </Button>
    </div>
  );

  const cards = filteredProjects.map((project) => (
    <motion.div
      key={project.key}
      variants={itemVariants}
      className={cn(isHorizontal && 'w-[26rem] shrink-0')}
    >
      <ProjectCard project={project} />
    </motion.div>
  ));

  // One shared tree: the two branches swap only the section's child, so the observed section node
  // survives the switch and its IntersectionObserver stays bound to a mounted element.
  return (
    <TooltipProvider delayDuration={200}>
      <section
        ref={sectionRef}
        id="projects"
        aria-labelledby="projects-heading"
        className={cn('bg-muted/30', !isHorizontal && 'py-12')}
      >
        {isHorizontal ? (
          <HorizontalChapter
            topBar={
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }
                }
                transition={{ duration: 0.6 }}
                // The chapter centres this bar with the panels rather than parking it at the top of the
                // pin, so the gap below is all the separation the filter needs from what it filters.
                className={cn(CONTAINER_CLASS, 'shrink-0 pb-6')}
              >
                {filter}
              </motion.div>
            }
            bottomBar={
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                }
                transition={{ duration: 0.6, delay: 0.2 }}
                className={cn(CONTAINER_CLASS, 'shrink-0 pt-6')}
              >
                {ctas}
              </motion.div>
            }
          >
            {/* Cover panel */}
            <div ref={coverRef} className={COVER_PANEL_CLASS}>
              <div className="max-w-3xl">
                {header}
                <ScrollHint />
              </div>
            </div>

            {/* One panel per project */}
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={containerVariants}
              // The row's height is fixed rather than taken from its tallest card: a filter whose cards
              // carry one badge row fewer would otherwise shorten the panel and shift the pinned bars.
              // Stretching then keeps every card equal, so their actions share one baseline.
              // The trailing gutter matches the page container's edge, so the last card stops where
              // every other section's content stops rather than flush against the viewport.
              className="flex min-h-[31rem] items-stretch gap-6 pr-[var(--panel-gutter)]"
            >
              {cards}
            </motion.div>
          </HorizontalChapter>
        ) : (
          <div className={CONTAINER_CLASS}>
            {header}

            <motion.div
              key={activeCategory}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={containerVariants}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {cards}
            </motion.div>

            {/* View More Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex justify-center"
            >
              {ctas}
            </motion.div>
          </div>
        )}
      </section>
    </TooltipProvider>
  );
};

export default Projects;
