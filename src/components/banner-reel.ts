import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import type { Transition } from 'framer-motion';
import { useInView, useReducedMotion } from 'framer-motion';
import type { RefObject } from 'react';

// Each role word holds this long before the next one rolls in; the roll itself is the spring below.
const STEP_MS = 1500;
// Outlasts a step's spring coming to rest (about 670ms), so the unseen rewind never cuts one short.
const SETTLE_MS = 800;
// How long the canonical role stands still between passes, counted from the end of the last step.
const REST_MS = 10_000;

const ROLL: Transition = { type: 'spring', visualDuration: 0.4, bounce: 0 };
const REWIND: Transition = { duration: 0 };

export interface RoleReel {
  /** Index of the slot on show. */
  slot: number;
  /** How to reach it: a spring, or an instant jump that nobody can see. */
  transition: Transition;
}

interface ReelState {
  slot: number;
  instant: boolean;
}

const subscribeToVisibility = (onChange: () => void): (() => void) => {
  document.addEventListener('visibilitychange', onChange);

  return () => document.removeEventListener('visibilitychange', onChange);
};

const isPageVisible = (): boolean => document.visibilityState === 'visible';

const assumePageVisible = (): boolean => true;

/**
 * Rolls the hero's role line: one pass through every slot, a rest on the first, repeated while it is seen.
 * @param ref The element whose visibility gates the reel.
 * @param slotCount Number of slots; the last repeats the first, so rewinding to it is invisible.
 * @returns The slot to show and the transition to reach it with.
 */
export const useRoleReel = (
  ref: RefObject<Element | null>,
  slotCount: number
): RoleReel => {
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref);
  const pageVisible = useSyncExternalStore(
    subscribeToVisibility,
    isPageVisible,
    assumePageVisible
  );
  const running = !prefersReducedMotion && inView && pageVisible;

  const [reel, setReel] = useState<ReelState>({ slot: 0, instant: false });
  const [wasRunning, setWasRunning] = useState(running);
  const hasRolled = useRef(false);

  // Stopping rewinds to the canonical role at once: the line is off screen or the tab is hidden.
  if (running !== wasRunning) {
    setWasRunning(running);
    if (!running) setReel({ slot: 0, instant: true });
  }

  useEffect(() => {
    if (!running) return;

    const timers = new Set<ReturnType<typeof setTimeout>>();
    const after = (ms: number, run: () => void) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        run();
      }, ms);
      timers.add(timer);
    };

    const pass = (firstStepIn: number) => {
      for (let slot = 1; slot < slotCount; slot++) {
        after(firstStepIn + STEP_MS * (slot - 1), () => {
          hasRolled.current = true;
          setReel({ slot, instant: false });
        });
      }

      const lastStepIn = firstStepIn + STEP_MS * (slotCount - 2);
      after(lastStepIn + SETTLE_MS, () => {
        setReel({ slot: 0, instant: true });
        pass(REST_MS);
      });
    };

    // Only the pass after page load starts early; returning to the hero waits out a full rest first.
    pass(hasRolled.current ? REST_MS : STEP_MS);

    return () => timers.forEach(clearTimeout);
  }, [running, slotCount]);

  return { slot: reel.slot, transition: reel.instant ? REWIND : ROLL };
};
