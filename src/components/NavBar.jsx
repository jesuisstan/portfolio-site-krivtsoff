'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuDrawer from './MenuDrawer';
import styles from '@/styles/NavBar.module.css';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    //<Router>
      <div className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logoWrapper}>
          <Image
            src="/logo.png"
            alt="Logo"
            width="0"
            height="0"
            sizes="100vw"
            className={styles.logo}
            onClick={() => (window.location.href = '/')}
          />
        </div>
        {isSmallScreen ? (
          <div
            className={styles.navbarToggle}
            onClick={() => setMenuDrawerOpen(true)}
          >
            <MenuIcon />
          </div>
        ) : (
          <div className={styles.navLinks}>
            <Link
              href="#home"
              style={activeLink === 'home' ? { opacity: '1' } : {}}
              onClick={() => onUpdateActiveLink('home')}
            >
              Home
            </Link>

            <Link
              href="#skills"
              style={activeLink === 'skills' ? { opacity: '1' } : {}}
              onClick={() => onUpdateActiveLink('skills')}
            >
              Skills
            </Link>

            <Link
              href="#projects"
              style={activeLink === 'projects' ? { opacity: '1' } : {}}
              onClick={() => onUpdateActiveLink('projects')}
            >
              Projects
            </Link>

            <Link href="#connect">
              <button className={styles.navButton}>
                <span>Let’s Connect</span>
              </button>
            </Link>
          </div>
        )}
        <MenuDrawer open={menuDrawerOpen} setOpen={setMenuDrawerOpen} />
      </div>
    //</Router>
  );
};
