'use client';

import { useMemo } from 'react';

import { useTheme } from 'next-themes';

// Tokens from globals.css as hex, because MagicCard composes them into a `radial-gradient()` inside an
// inline style, where a token class cannot reach. Keep in sync with those variables.

// `--primary-alt` at the cursor, `--primary` further out — the gradient border stops. Both
// theme-constant: oklch(0.7208 0.134 25.35) and oklch(0.715 0.122 196.14).
const GRADIENT_FROM = '#ed8179';
const GRADIENT_TO = '#00babc';

// The spotlight wash over the card surface: `--accent` in both themes — oklch(0.29 0.04 196.14) in
// `.dark`, oklch(0.955 0.025 196.14) in `:root`.
const GRADIENT_COLOR_DARK = '#0e3132';
const GRADIENT_COLOR_LIGHT = '#def6f6';

interface MagicCardColors {
  gradientFrom: string;
  gradientTo: string;
  gradientColor: string;
}

/** Returns MagicCard's gradient and spotlight colours for the active theme, as hex literals. */
export const useMagicCardColors = (): MagicCardColors => {
  const { resolvedTheme } = useTheme();

  return useMemo(
    () => ({
      gradientFrom: GRADIENT_FROM,
      gradientTo: GRADIENT_TO,
      gradientColor:
        resolvedTheme === 'dark' ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT
    }),
    [resolvedTheme]
  );
};
