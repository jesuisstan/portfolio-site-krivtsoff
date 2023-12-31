'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div title="Toggle theme" onClick={toggleTheme}>
      {theme === 'light' ? (
        <Image
          src="/moon.svg"
          alt="moon"
          width={12}
          height={12}
          sizes="100vw"
          style={{
            width: '1.2rem',
            height: '1.2rem',
            cursor: 'pointer'
          }}
        />
      ) : (
        <Image
          src="/sun.svg"
          alt="sun"
          width={12}
          height={12}
          sizes="100vw"
          style={{
            width: '1.2rem',
            height: '1.2rem',
            cursor: 'pointer',
            filter: 'brightness(0) invert(1) saturate(5)'
          }}
        />
      )}
    </div>
  );
};

export default ThemeToggler;
