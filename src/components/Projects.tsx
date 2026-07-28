'use client';

import { useRef, useState } from 'react';

import type { Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import { BarChart3, Code, Eye, Github } from 'lucide-react';
import Image from 'next/image';

import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import ToggleGroup, { ToggleGroupItem } from '@/components/ui/toggle-group';
import Tooltip, {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import type { ProjectCategory, ProjectFilter } from '@/constants/projects';
import { projects } from '@/constants/projects';
import { FILTER_CHIP_CLASS } from '@/lib/filter-chip';
import { cn } from '@/lib/utils';

const descriptionClasses =
  'mb-4 line-clamp-3 text-left text-sm leading-relaxed text-muted-foreground';

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

const categories: ProjectFilter[] = [
  'All',
  'Full-Stack',
  'Frontend',
  'Game',
  'Mobile'
];

const octoprofileUrl = `https://octoprofile.vercel.app/user?id=${process.env.NEXT_PUBLIC_GITHUB_PROFILE}`;

/** Projects section with category filtering and per-card action links. */
const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState<ProjectFilter>('All');

  const filteredProjects =
    activeCategory === 'All'
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

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-muted/30 py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-12 text-center"
        >
          <motion.h2
            id="projects-heading"
            variants={itemVariants}
            className="mb-8 text-4xl font-bold text-foreground lg:text-5xl"
          >
            Featured <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground"
          >
            Here are some of my recent projects that showcase my skills and
            passion for web development.
          </motion.p>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <ToggleGroup
              type="single"
              variant="outline"
              spacing={2}
              value={activeCategory}
              onValueChange={(value) => {
                if (value) setActiveCategory(value as ProjectFilter);
              }}
              aria-label="Filter projects by category"
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
        </motion.div>

        <TooltipProvider delayDuration={200}>
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="group h-full gap-0 overflow-hidden p-0 transition-colors hover:border-primary/50">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
                    />
                    {/* Category Badge */}
                    <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                      {(Array.isArray(project.category)
                        ? project.category
                        : [project.category]
                      ).map((category, idx) => (
                        <Badge
                          key={idx}
                          className="bg-primary/90 backdrop-blur-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5">
                    <h3 className="mb-2 text-xl font-bold text-card-foreground transition-colors group-hover:text-accent-foreground">
                      {project.title}
                    </h3>
                    <ProjectDescription description={project.description} />

                    {/* Technologies */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="rounded-md"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button asChild size="sm" className="flex-1">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Code />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TooltipProvider>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <a
                href={process.env.NEXT_PUBLIC_LINK_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-5" />
                View More on GitHub
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
            >
              <a
                href={octoprofileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BarChart3 className="size-5" />
                GitHub Stats
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
