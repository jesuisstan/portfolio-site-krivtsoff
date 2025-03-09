'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

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

  /* To render Menu only on client side to avoid hydration errors */
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div title="Toggle theme" onClick={toggleTheme}>
          {theme === 'light' ? (
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
      )}
    </>
  );
};

export default ThemeToggler;
