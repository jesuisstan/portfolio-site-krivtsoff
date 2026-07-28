'use client';

import { useMemo } from 'react';

import { useTheme } from 'next-themes';

// `--foreground` from globals.css as hex, because a canvas fill cannot take a token class. Keep in sync
// with that variable: oklch(0.985 0 0) in `.dark`, oklch(0.145 0 0) in `:root`.
const FOREGROUND_DARK = '#fafafa';
const FOREGROUND_LIGHT = '#0a0a0a';

/** Returns the reading colour of the active theme as a hex literal, for canvas fills. */
export const useParticleColor = (): string => {
  const { resolvedTheme } = useTheme();

  return useMemo(
    () => (resolvedTheme === 'dark' ? FOREGROUND_DARK : FOREGROUND_LIGHT),
    [resolvedTheme]
  );
};
