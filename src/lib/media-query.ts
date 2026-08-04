'use client';

import { useCallback, useSyncExternalStore } from 'react';

const getServerSnapshot = (): boolean => false;

/**
 * Tracks a CSS media query without ever disagreeing with the server render.
 * @param query Media query string, e.g. `(min-width: 1024px)`.
 * @returns Whether the query matches; always false on the server and through hydration.
 */
export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onStoreChange: () => void): (() => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onStoreChange);

      return () => list.removeEventListener('change', onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    (): boolean => window.matchMedia(query).matches,
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
