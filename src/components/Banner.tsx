'use client';

import { useRef } from 'react';

import { motion } from 'framer-motion';
import { Download, MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  bannerRoleWords,
  bannerSocialLinks,
  bannerStats
} from '@/components/banner-content';
import { useRoleReel } from '@/components/banner-reel';
import Button from '@/components/ui/button';
import { Particles } from '@/components/ui/particles';
import { REDUCED_MOTION_QUERY, useMediaQuery } from '@/lib/media-query';
import { useParticleColor } from '@/lib/particle-color';
import { useSmoothScrollTo } from '@/lib/smooth-scroll';

// The role the line rests on, and the one shown wherever it cannot move.
const RESTING_ROLE = bannerRoleWords[bannerRoleWords.length - 1];

// It also opens the reel, so a pass through the list lands back on it and every step rolls one way.
const ROLE_SLOTS = [RESTING_ROLE, ...bannerRoleWords];

/** Hero: the name over a rolling role, the intro, the actions and the key facts in one centred column. */
const Banner = () => {
  const roleLineRef = useRef<HTMLSpanElement>(null);
  const reel = useRoleReel(roleLineRef, ROLE_SLOTS.length);
  // False until hydration has finished, so the canvas renders exactly as on the server, then leaves if asked.
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const particleColor = useParticleColor();
  const scrollTo = useSmoothScrollTo();
  const t = useTranslations('banner');
  const tCommon = useTranslations('common');

  const downloadCV = () => {
    const cvUrl =
      process.env.NEXT_PUBLIC_LINK_CV_DOWNLOAD ||
      '/Krivtsov Stanislav_Frontend developer_CV.pdf';

    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Krivtsov Stanislav_Frontend developer_CV.pdf';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToContact = () => {
    scrollTo('#contact');
  };

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-background pt-16"
    >
      {/* The footer's field, so the page opens and closes on the same dust. */}
      {!prefersReducedMotion && (
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={particleColor}
          refresh
        />
      )}
      {/* `relative z-10` keeps the z-0 particle canvas from painting over this in-flow content. */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
        <div className="flex w-full flex-col items-center gap-4">
          <h1
            id="home-heading"
            className="w-full max-w-5xl text-4xl leading-none font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="block">Stanislav Krivtsov</span>{' '}
            {/* The role assistive tech reads; the rolling copies are visual only, so nothing is announced. */}
            <span className="sr-only">
              {t.rich('role', {
                word: RESTING_ROLE,
                accent: (chunks) => chunks
              })}
            </span>
            {/* `&nbsp;` holds the line open under the stacked slots; tracking is re-declared because an inherited em value keeps the name's pixels. */}
            <span
              ref={roleLineRef}
              aria-hidden
              className="relative flex w-full justify-center overflow-hidden text-2xl leading-tight font-normal tracking-tighter sm:text-[1em]"
            >
              &nbsp;
              {ROLE_SLOTS.map((word, slot) => (
                <motion.span
                  key={slot}
                  className="absolute whitespace-nowrap"
                  initial={false}
                  animate={
                    slot === reel.slot
                      ? { y: '0%', opacity: 1 }
                      : { y: slot < reel.slot ? '-100%' : '100%', opacity: 0 }
                  }
                  transition={reel.transition}
                >
                  {t.rich('role', {
                    word,
                    accent: (chunks) => (
                      <span className="text-primary">{chunks}</span>
                    )
                  })}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed tracking-tight text-balance text-muted-foreground md:text-xl">
            {t('intro')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            variant="outline"
            className="h-11"
            onClick={downloadCV}
          >
            {tCommon('download-cv')}
            <Download />
          </Button>
          <Button size="lg" className="h-11" onClick={scrollToContact}>
            {t('talk')}
            <MoveRight />
          </Button>
          {/* One wrapping unit, so a narrow row never strands a single icon on a line of its own. */}
          <div className="flex gap-3">
            {bannerSocialLinks.map((social) => (
              <Button
                key={social.label}
                asChild
                variant="outline"
                size="icon-lg"
                className="size-11"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="size-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-[auto_auto] gap-x-6 gap-y-2 text-sm md:flex md:gap-x-8">
          {bannerStats.map((stat) => (
            <li key={stat.key}>
              <span className="font-semibold text-foreground tabular-nums">
                {stat.number}
                {stat.suffix}
              </span>{' '}
              <span className="text-muted-foreground">
                {t(`stats.${stat.key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Banner;
