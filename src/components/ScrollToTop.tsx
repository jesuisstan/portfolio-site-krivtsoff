'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Button from '@/components/ui/button';
import { useSmoothScrollTo } from '@/lib/smooth-scroll';

/** Floating back-to-top control, revealed once the hero has scrolled out of view. */
const ScrollToTop = () => {
  const scrollTo = useSmoothScrollTo();
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('common');

  useEffect(() => {
    const hero = document.querySelector('#home');
    if (!hero) return;

    // A threshold rather than 0: the hero is `min-h-screen`, so at the top of the next section its
    // last strip is still behind the fixed nav and a 0 threshold would keep the button hidden there.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="fixed right-6 bottom-6 z-40"
        >
          <Button
            variant="outline"
            size="icon-lg"
            // Semi-transparent so it reads as floating above the page rather than pinned to it.
            // `dark:` repeated because the outline variant carries its own dark background.
            className="opacity-90 size-12 bg-card/60 shadow-overlay backdrop-blur-sm hover:bg-card/90 dark:bg-card/60 dark:hover:bg-card/90"
            aria-label={t('back-to-top')}
            onClick={() => scrollTo(0)}
          >
            <ArrowUp className="size-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
