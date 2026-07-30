'use client';

import { startTransition, useEffect, useLayoutEffect, useState } from 'react';

import { motion, useReducedMotion } from 'framer-motion';
import { Download, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import LanguageToggle from '@/components/LanguageToggle';
import AnimatedThemeToggler from '@/components/ui/animated-theme-toggler';
import Button, { buttonVariants } from '@/components/ui/button';
import Sheet, {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type NavItemKey = 'home' | 'skills' | 'experience' | 'projects' | 'contact';

interface NavItem {
  key: NavItemKey;
  href: string;
}

const navItems: NavItem[] = [
  { key: 'home', href: '#home' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' }
];

/** Fixed top navigation with section links, theme and language toggles, and mobile drawer. */
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  // Set mounted after component mounts to prevent hydration mismatch
  // useLayoutEffect runs synchronously before browser paint
  // startTransition makes the state update non-blocking to avoid cascading renders
  useLayoutEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    // First close mobile menu
    setIsOpen(false);

    // Add a small delay to ensure menu closes
    setTimeout(() => {
      const element = document.querySelector<HTMLElement>(href);
      if (element) {
        // Consider fixed navigation height
        const navHeight = 64; // h-16 = 64px
        const elementPosition = element.offsetTop - navHeight;

        // Use scrollIntoView as fallback
        try {
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        } catch {
          // Fallback to scrollIntoView if scrollTo doesn't work
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        console.warn(`Element with id "${href}" not found`);
        // Try to find element by another selector
        const alternativeElement = document.querySelector(
          `[id="${href.substring(1)}"]`
        );
        if (alternativeElement) {
          alternativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }, 150); // Increase delay for more reliable menu closing
  };

  const downloadCV = () => {
    // Create link to PDF file in public folder
    const cvUrl =
      process.env.NEXT_PUBLIC_LINK_CV_DOWNLOAD ||
      '/Krivtsov Stanislav_Frontend developer_CV.pdf';

    // Create temporary <a> element for download
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Krivtsov Stanislav_Frontend developer_CV.pdf'; // Filename when downloading
    link.target = '_blank';

    // Add element to DOM, click it and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      aria-label={t('aria-main')}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                K
              </span>
            </div>
            <span className="truncate text-xl font-bold text-foreground">
              krivtsoff.develop()
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => scrollToSection(item.href)}
                >
                  {t(`items.${item.key}`)}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Language Toggle */}
            <LanguageToggle />

            {/* Theme Toggle */}
            <AnimatedThemeToggler
              theme={isDark ? 'dark' : 'light'}
              onThemeChange={setTheme}
              duration={prefersReducedMotion ? 0 : 400}
              className={buttonVariants({
                variant: 'ghost',
                size: 'icon',
                className: "size-11 [&_svg:not([class*='size-'])]:size-5"
              })}
              aria-label={isDark ? t('to-light-theme') : t('to-dark-theme')}
            />

            {/* Download CV */}
            <Button className="hidden sm:flex" onClick={downloadCV}>
              <Download />
              {tCommon('download-cv')}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11 lg:hidden"
                  aria-label={t('open-menu')}
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72"
                closeLabel={t('close-menu')}
                aria-describedby={undefined}
              >
                <SheetHeader>
                  <SheetTitle>krivtsoff.develop()</SheetTitle>
                </SheetHeader>
                <nav
                  aria-label={t('aria-sections')}
                  className="flex flex-col gap-1 px-4"
                >
                  {navItems.map((item) => (
                    <Button
                      key={item.key}
                      variant="ghost"
                      className="h-11 justify-start text-base text-muted-foreground hover:text-foreground"
                      onClick={() => scrollToSection(item.href)}
                    >
                      {t(`items.${item.key}`)}
                    </Button>
                  ))}
                  <Button className="mt-4 h-11" onClick={downloadCV}>
                    <Download />
                    {tCommon('download-cv')}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
