'use client';

import { useEffect, useRef, useState } from 'react';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';

import Button from '@/components/ui/button';
import { Particles } from '@/components/ui/particles';
import Separator from '@/components/ui/separator';
import { CURTAIN_PEEK_PX, CURTAIN_QUERY } from '@/lib/curtain';
import { useMediaQuery } from '@/lib/media-query';
import { useParticleColor } from '@/lib/particle-color';
import { socialLinks } from '@/lib/social-links';
import { cn } from '@/lib/utils';

// The section whose arrival uncovers the peek strip. Until it reaches the viewport the panel sits
// entirely off-screen, so nothing hints at the footer while the visitor is still reading the page.
const TRIGGER_SECTION_ID = 'contact';

// Scroll distance the peek strip slides in over.
const PEEK_REVEAL_PX = 240;

// Once the panel covers this share of its own height the pointer belongs to it. Below that the strip
// lies over content it must not intercept clicks for.
const INTERACTIVE_COVERAGE = 0.5;

interface RevealMetrics {
  /** Panel height — and therefore how far down it sits while fully hidden. */
  height: number;
  /** Scroll offset at which the peek strip starts sliding into view. */
  peekStart: number;
  /** Scroll offset at which the panel starts unfurling over the page. */
  riseStart: number;
  /** Scroll offset at which it fully covers the viewport: the end of the document. */
  riseEnd: number;
}

const IDLE_METRICS: RevealMetrics = {
  height: 0,
  peekStart: 0,
  riseStart: 0,
  riseEnd: 0
};

/** Site footer: an in-flow strip on small screens, a full-screen panel riding up over the page above `md`. */
const Footer = () => {
  const prefersReducedMotion = useReducedMotion();
  const isPinnable = useMediaQuery(CURTAIN_QUERY);
  const particleColor = useParticleColor();
  const t = useTranslations('footer');

  const footerRef = useRef<HTMLElement>(null);
  const [metrics, setMetrics] = useState<RevealMetrics>(IDLE_METRICS);

  const enabled = isPinnable && !prefersReducedMotion;
  const isPinned = enabled && metrics.riseEnd > metrics.riseStart;

  const peekY = Math.max(0, metrics.height - CURTAIN_PEEK_PX);
  const { scrollY } = useScroll();
  // Both ranges are rebuilt on every render, so a resize that changes `metrics` re-maps in place. The
  // middle pair holds the strip still between the trigger section and the end of the document; the two
  // stops collapse into one when the section lands too late for a plateau, which interpolates fine
  // because both sides carry the same offset.
  const y = useTransform(
    scrollY,
    [
      metrics.peekStart,
      metrics.peekStart + PEEK_REVEAL_PX,
      metrics.riseStart,
      metrics.riseEnd
    ],
    [metrics.height, peekY, peekY, 0]
  );
  const pointerEvents = useTransform(
    y,
    (value): CSSProperties['pointerEvents'] =>
      value < metrics.height * (1 - INTERACTIVE_COVERAGE) ? 'auto' : 'none'
  );

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    if (!enabled) {
      // Motion writes its style prop inline and dropping it does not clear what was written; a
      // leftover translate would shove the in-flow footer past the end of the document. Nothing else
      // sets inline styles here, so clearing the attribute is safe. Stale metrics need no reset —
      // nothing reads them while `enabled` is false.
      footer.removeAttribute('style');

      return;
    }

    const sync = () => {
      const height = footer.offsetHeight;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      // The rise covers the distance still left above the peek strip, so it runs 1:1 with the scroll and
      // starts on the exact pixel the sticky Contact section locks against the strip.
      const riseStart =
        maxScroll - Math.max(0, Math.min(height - CURTAIN_PEEK_PX, maxScroll));
      const trigger = document.getElementById(TRIGGER_SECTION_ID);
      // Where the trigger section's top edge crosses the bottom of the viewport. Falling back to
      // `riseStart` keeps a missing section from parking the panel on screen from the top of the page.
      const triggerEntry = trigger
        ? trigger.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight
        : riseStart;
      const next: RevealMetrics = {
        height,
        // Never later than the unfurl, so the strip is always fully out before the panel starts rising.
        peekStart: Math.min(triggerEntry, riseStart - PEEK_REVEAL_PX),
        riseStart,
        riseEnd: maxScroll
      };

      setMetrics((previous) =>
        previous.height === next.height &&
        previous.peekStart === next.peekStart &&
        previous.riseStart === next.riseStart &&
        previous.riseEnd === next.riseEnd
          ? previous
          : next
      );
    };
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(document.documentElement);
    observer.observe(footer);
    window.addEventListener('resize', sync);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [enabled]);

  return (
    <motion.footer
      ref={footerRef}
      style={isPinned ? { y, pointerEvents } : undefined}
      className={cn(
        'relative overflow-hidden border-t border-border bg-muted/30 select-none',
        // Above `md` the panel leaves the flow and paints over the page, parked wholly off the bottom
        // until scroll lifts it. Below `md`, and under reduced motion, none of it applies.
        'motion-safe:md:fixed motion-safe:md:inset-x-0 motion-safe:md:bottom-0 motion-safe:md:z-20 motion-safe:md:h-svh motion-safe:md:rounded-t-xl motion-safe:md:bg-muted motion-safe:md:shadow-overlay',
        // Parks the panel before the first measurement lands. Tailwind v4 writes the `translate`
        // property, which composes with — rather than being overridden by — Motion's `transform`, so
        // it has to come off the moment the scroll-linked `y` takes over.
        !isPinned && 'motion-safe:md:translate-y-full'
      )}
    >
      {/* Decorative drifting field — omitted outright under reduced motion. */}
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
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center md:gap-12">
          {/* Brand and tagline. `once` matters now that the panel really is uncovered on screen:
              without it every scroll pass would replay the reveal. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* The wordmark steps down to a signature: on a full screen the name is what should carry
                the composition, and two display-size lines would compete. */}
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary md:size-10">
                <span className="text-sm font-bold text-primary-foreground md:text-lg">
                  K
                </span>
              </div>
              <span className="text-base font-bold text-foreground md:text-xl">
                krivtsoff.develop()
              </span>
            </div>
            <h2 className="mt-6 text-3xl leading-[1.1] font-bold text-foreground sm:text-4xl md:mt-8 lg:text-5xl">
              Stanislav <span className="text-primary">Krivtsov</span>
            </h2>
            {/* No role line here: the tagline already opens on the role, and the city belongs to the
                closing line at the bottom of the panel. */}
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:mt-5 md:max-w-2xl md:text-lg">
              {t('tagline')}
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground md:mb-6 md:text-2xl">
              {t('follow-me')}
            </h3>
            <div className="flex justify-center gap-4 md:gap-6">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="outline"
                  size="icon-lg"
                  className="size-12 md:size-14"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="size-6 md:size-7" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12"
        >
          <Separator className="mb-6 md:mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>{t('copyright')}</span>
            {/* One message per line: the wording around the icon differs per language, so the
                sentence cannot be assembled from separate spans. */}
            <span>
              {t.rich('made-with', {
                link: (chunks) => (
                  <a
                    href="https://github.com/jesuisstan/portfolio-site-krivtsoff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-sm underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {chunks}
                  </a>
                ),
                heart: () => (
                  <motion.span
                    animate={
                      prefersReducedMotion ? undefined : { scale: [1, 1.2, 1] }
                    }
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-flex align-middle"
                  >
                    <Heart
                      aria-hidden
                      className="size-4 fill-current text-primary-alt"
                    />
                  </motion.span>
                )
              })}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
