'use client';

import { useCallback, useEffect } from 'react';

import { useLenis } from 'lenis/react';

import { useMediaQuery } from '@/lib/media-query';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Upper bound on a jump, for browsers without `scrollend` and for scrolls the visitor abandons. */
const SETTLE_TIMEOUT_MS = 3000;

export type SmoothScrollTarget = number | string | HTMLElement;

export interface SmoothScrollOptions {
  /** Runs exactly once: when the scroll settles, or when it is abandoned. */
  onComplete?: () => void;
  /**
   * Lands on the target in one frame instead of easing to it. For re-anchoring a scroll whose page is
   * about to change height under it — an eased jump would be clamped away mid-flight.
   */
  immediate?: boolean;
}

export type SmoothScrollTo = (
  target: SmoothScrollTarget,
  options?: SmoothScrollOptions
) => void;

// Lenis re-dispatches `scrollend` itself and swallows the native ones it would otherwise trigger
// every frame, so one listener covers both the inertia path and the plain one.
const settleOnce = (onComplete: () => void): (() => void) => {
  let done = false;

  const settle = () => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    window.removeEventListener('scrollend', settle);
    onComplete();
  };

  const timer = setTimeout(settle, SETTLE_TIMEOUT_MS);
  window.addEventListener('scrollend', settle);

  return settle;
};

/**
 * Suspends the scroll inertia while an overlay owns the scroll, such as the mobile drawer.
 * @param locked Whether the overlay currently holds the page's scroll lock.
 * @returns Nothing.
 */
export const useScrollInertiaLock = (locked: boolean): void => {
  const lenis = useLenis();

  // Radix freezes the document while the drawer is open. Left running, the inertia layer keeps
  // banking wheel deltas against a page that cannot move and spends them the moment it is released.
  useEffect(() => {
    if (!lenis) return;

    if (locked) lenis.stop();
    else lenis.start();
  }, [lenis, locked]);
};

/**
 * Returns the page's programmatic scroll, routed through the inertia layer whenever it is running.
 * @returns A callback taking a document offset in px, a CSS selector or an element, plus an
 *   optional completion handler. Element targets honour `scroll-padding-top` on either path.
 */
export const useSmoothScrollTo = (): SmoothScrollTo => {
  const lenis = useLenis();
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  return useCallback<SmoothScrollTo>(
    (target, { onComplete, immediate } = {}) => {
      const settle = onComplete && settleOnce(onComplete);

      if (lenis) {
        lenis.scrollTo(target, { onComplete: settle, immediate });
        return;
      }

      const behavior: ScrollBehavior =
        prefersReducedMotion || immediate ? 'auto' : 'smooth';

      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior });
        return;
      }

      const element =
        typeof target === 'string'
          ? document.querySelector<HTMLElement>(target)
          : target;

      // `scrollIntoView` rather than an offset of our own: it is what reads `scroll-padding-top`.
      element?.scrollIntoView({ behavior, block: 'start' });
    },
    [lenis, prefersReducedMotion]
  );
};
