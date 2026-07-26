'use client';

import { useRef, useState } from 'react';

import type { Variants } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';
import ToggleGroup, { ToggleGroupItem } from '@/components/ui/toggle-group';
import type { TechnologyFilter } from '@/constants/technologies';
import { categories, technologies } from '@/constants/technologies';

/** Skills section with a category filter over the technology logo grid. */
const SkillsAndTech = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState<TechnologyFilter>('All');

  const filteredTechnologies =
    activeCategory === 'All'
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

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
          className="mb-12 text-center"
        >
          <motion.h2
            id="skills-heading"
            variants={itemVariants}
            className="mb-8 text-4xl font-bold text-foreground lg:text-5xl"
          >
            <span className="text-primary">Skills</span> & Technologies
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-3xl text-xl text-muted-foreground"
          >
            I specialize in modern web and mobile technologies, creating
            responsive and scalable applications with a comprehensive tech
            stack.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 flex justify-center"
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
                className="h-9 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {category}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
        >
          {filteredTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.6 + index * 0.05, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Card className="h-full gap-2 p-4 text-center transition-colors hover:border-primary/40">
                <div className="relative mx-auto size-12 rounded-lg bg-muted p-2">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12vw"
                    className="object-contain p-1.5"
                  />
                </div>
                <h3 className="text-sm font-semibold text-card-foreground">
                  {tech.name}
                </h3>
                <Badge variant="secondary" className="mx-auto">
                  {tech.category}
                </Badge>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsAndTech;
