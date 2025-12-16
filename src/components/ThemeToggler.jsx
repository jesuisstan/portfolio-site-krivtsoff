'use client';

import React from 'react';

import Image from 'next/image';
import { useTheme } from 'next-themes';

const ThemeToggler = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const SWITCH = () => {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('light');
        break;
      default:
        break;
    }
  };

  const toggleTheme = () => {
    //@ts-ignore
    if (!document.startViewTransition) SWITCH();

    //@ts-ignore
    document.startViewTransition(SWITCH);
  };

  const commonStyle = {
    width: '1.2rem',
    height: '1.2rem',
    cursor: 'pointer'
  };

  return (
    <div title="Toggle theme" onClick={toggleTheme} suppressHydrationWarning>
      {resolvedTheme === 'light' ? (
        <Image
          src="/sun.svg"
          alt="toggle-icon"
          width={12}
          height={12}
          sizes="100vw"
          style={{ ...commonStyle }}
        />
      ) : (
        <Image
          src="/moon.svg"
          alt="toggle-icon"
          width={12}
          height={12}
          sizes="100vw"
          style={{
            ...commonStyle,
            filter: 'brightness(0) invert(1) saturate(5)'
          }}
        />
      )}
    </div>
  );
};

export default ThemeToggler;
