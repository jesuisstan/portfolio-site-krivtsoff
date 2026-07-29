'use client';

import { useRef } from 'react';

import type { Variants } from 'framer-motion';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Award,
  Calendar,
  ExternalLink,
  GraduationCap,
  MapPin,
  User
} from 'lucide-react';
import type { ReactNode } from 'react';

import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';
import MagicCard from '@/components/ui/magic-card';
import Separator from '@/components/ui/separator';
import { experiences } from '@/constants/experiences';
import { useMagicCardColors } from '@/lib/magic-card-color';

/** Timeline card surface: MagicCard's pointer-tracked spotlight, or a plain Card under reduced motion. */
const ExperienceCard = ({ children }: { children: ReactNode }) => {
  const prefersReducedMotion = useReducedMotion();
  const colors = useMagicCardColors();

  if (prefersReducedMotion) {
    return <Card className="gap-2 p-4">{children}</Card>;
  }

  return (
    <MagicCard
      className="rounded-xl text-card-foreground shadow-ambient"
      {...colors}
    >
      <div className="flex flex-col gap-2 p-4">{children}</div>
    </MagicCard>
  );
};

/** Timeline of professional experience, education, and certifications. */
const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

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
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-background py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-8 text-center"
        >
          <motion.h2
            id="experience-heading"
            variants={itemVariants}
            className="mb-6 text-4xl font-bold text-foreground lg:text-5xl"
          >
            <span className="text-primary">Experience</span> & Education
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-3xl text-xl text-muted-foreground"
          >
            My journey from management education to frontend development
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="relative"
        >
          {/* Timeline Line */}
          <Separator
            orientation="vertical"
            className="absolute left-8 md:left-1/2 md:-translate-x-1/2"
          />

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              className={`relative mb-8 flex flex-col gap-8 md:flex-row ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 z-10 size-4 rounded-full border-4 border-background bg-primary md:left-1/2 md:-translate-x-1/2" />

              {/* Content Card */}
              <div className="md:w-6/12 lg:w-6/12">
                <ExperienceCard>
                  {/* Type Badge */}
                  <Badge variant="secondary" className="mb-2 w-fit">
                    {experience.type === 'Freelance' && <Award />}
                    {experience.type === 'Education' && <GraduationCap />}
                    {experience.type === 'Management' && <User />}
                    {experience.type}
                  </Badge>

                  <h3 className="text-xl font-bold text-card-foreground">
                    {experience.title}
                  </h3>
                  <h4 className="text-lg font-semibold text-accent-foreground">
                    {experience.companyUrl ? (
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-sm underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        {experience.company}
                        <ExternalLink className="size-4" />
                      </a>
                    ) : (
                      experience.company
                    )}
                  </h4>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 size-4" />
                      {experience.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 size-4" />
                      {experience.location}
                    </div>
                  </div>

                  <p className="leading-relaxed text-muted-foreground">
                    {experience.description}
                  </p>

                  {experience.responsibilities && (
                    <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                      {experience.responsibilities.map(
                        (responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        )
                      )}
                    </ul>
                  )}

                  {/* Certificates List */}
                  {experience.certificates && (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-card-foreground">
                        {experience.id === 2
                          ? 'State-recognized certifications (RNCP):'
                          : 'Academic degrees:'}
                      </p>
                      <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                        {experience.certificates.map((cert, idx) => (
                          <li key={idx}>
                            {cert.url ? (
                              <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-sm font-medium text-accent-foreground underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                              >
                                {cert.title}
                              </a>
                            ) : (
                              <span className="font-medium">{cert.title}</span>
                            )}
                            {' - '}
                            <span className="text-accent-foreground">
                              {cert.level}
                            </span>{' '}
                            <span>({cert.date})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Positions List */}
                  {experience.positions && (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-card-foreground">
                        Positions:
                      </p>
                      <ul className="ml-4 list-disc space-y-2 text-sm text-muted-foreground">
                        {experience.positions.map((position, idx) => (
                          <li key={idx}>
                            <span className="font-medium">
                              {position.title}
                            </span>
                            {' at '}
                            {position.companyUrl ? (
                              <a
                                href={position.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-sm font-medium text-accent-foreground underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                              >
                                {position.company}
                              </a>
                            ) : (
                              <span className="font-medium">
                                {position.company}
                              </span>
                            )}
                            {': '}
                            <span>{position.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="mt-1 flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="rounded-md"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </ExperienceCard>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
