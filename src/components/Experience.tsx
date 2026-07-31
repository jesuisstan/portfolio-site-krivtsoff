'use client';

import { useRef } from 'react';

import type { Variants } from 'framer-motion';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  ExternalLink,
  GraduationCap,
  MapPin,
  User
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';
import MagicCard from '@/components/ui/magic-card';
import Separator from '@/components/ui/separator';
import type { CertificateKey, ExperienceKey } from '@/constants/experiences';
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
  const t = useTranslations('experience');

  const responsibilities: string[] = t.raw(
    'items.quantcube.responsibilities'
  ) as string[];

  // Only the two education entries carry certificates, so the path built from `experience.key` spans
  // more combinations than the message tree holds — hence the assertion on the key.
  const certificateText = (
    experienceKey: ExperienceKey,
    certificateKey: CertificateKey,
    field: 'title' | 'level' | 'date'
  ): string =>
    t(
      `items.${experienceKey}.certificates.${certificateKey}.${field}` as Parameters<
        typeof t
      >[0]
    );

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
            {t.rich('heading', {
              accent: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-3xl text-xl text-muted-foreground"
          >
            {t('subtitle')}
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
              key={experience.key}
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
                    {experience.type === 'education' && <GraduationCap />}
                    {experience.type === 'management' && <User />}
                    {t(`types.${experience.type}`)}
                  </Badge>

                  <h3 className="text-xl font-bold text-card-foreground">
                    {t(`items.${experience.key}.title`)}
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
                      {t(`items.${experience.key}.period`)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 size-4" />
                      {t(`items.${experience.key}.location`)}
                    </div>
                  </div>

                  <p className="leading-relaxed text-muted-foreground">
                    {t(`items.${experience.key}.description`)}
                  </p>

                  {experience.key === 'quantcube' && (
                    <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                      {responsibilities.map((responsibility, idx) => (
                        <li key={idx}>{responsibility}</li>
                      ))}
                    </ul>
                  )}

                  {/* Certificates List */}
                  {experience.certificates && experience.certificatesLabel && (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-card-foreground">
                        {t(`labels.${experience.certificatesLabel}`)}
                      </p>
                      <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                        {experience.certificates.map((cert) => (
                          <li key={cert.key}>
                            {cert.url ? (
                              <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-sm font-medium text-accent-foreground underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                              >
                                {certificateText(
                                  experience.key,
                                  cert.key,
                                  'title'
                                )}
                              </a>
                            ) : (
                              <span className="font-medium">
                                {certificateText(
                                  experience.key,
                                  cert.key,
                                  'title'
                                )}
                              </span>
                            )}
                            {' - '}
                            <span className="text-accent-foreground">
                              {certificateText(
                                experience.key,
                                cert.key,
                                'level'
                              )}
                            </span>{' '}
                            <span>
                              (
                              {certificateText(
                                experience.key,
                                cert.key,
                                'date'
                              )}
                              )
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Positions List */}
                  {experience.positions && (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-card-foreground">
                        {t('labels.positions')}
                      </p>
                      <ul className="ml-4 list-disc space-y-2 text-sm text-muted-foreground">
                        {experience.positions.map((position) => (
                          <li key={position.key}>
                            {/* One message per line: French places the connector and the colon
                                differently, so the sentence cannot be assembled in JSX. */}
                            {t.rich('labels.position-line', {
                              title: t(
                                `items.management.positions.${position.key}.title`
                              ),
                              description: t(
                                `items.management.positions.${position.key}.description`
                              ),
                              name: (chunks) => (
                                <span className="font-medium">{chunks}</span>
                              ),
                              company: () => (
                                <a
                                  href={position.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-sm font-medium text-accent-foreground underline decoration-dotted underline-offset-2 transition-opacity hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                >
                                  {position.company}
                                </a>
                              )
                            })}
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
