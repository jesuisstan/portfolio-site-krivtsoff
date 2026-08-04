import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import SmoothScroll from '@/components/SmoothScroll';
import ThemeProvider from '@/components/ThemeProvider';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

import '@/styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

const SITE_URL = 'https://krivtsoff.online';

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR'
};

type LocaleParams = { locale: string };

/** Pre-renders one document per configured locale at build time. */
export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

/** Builds the locale-aware document metadata, including the hreflang alternates. */
export const generateMetadata = async ({
  params
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const active = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: active, namespace: 'metadata' });

  const canonical = getPathname({ locale: active, href: '/' });

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Stanislav Krivtsoff' }],
    creator: 'Stanislav Krivtsoff',
    alternates: {
      canonical,
      languages: {
        en: getPathname({ locale: 'en', href: '/' }),
        fr: getPathname({ locale: 'fr', href: '/' })
      }
    },
    openGraph: {
      title: t('title'),
      description: t('og-description'),
      url: canonical,
      siteName: t('site-name'),
      images: [
        {
          url: '/avatar.jpg',
          width: 1200,
          height: 630,
          alt: t('image-alt')
        }
      ],
      locale: OG_LOCALE[active],
      alternateLocale: routing.locales
        .filter((candidate) => candidate !== active)
        .map((candidate) => OG_LOCALE[candidate]),
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('og-description'),
      images: ['/avatar.jpg']
    },
    icons: {
      icon: [
        '/favicon.ico?v-4',
        { url: '/favicon-32x32.png?v-4', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png?v-4', sizes: '16x16', type: 'image/png' }
      ],
      apple: ['/apple-touch-icon.png?v-4'],
      shortcut: ['/apple-touch-icon.png?v-4']
    },
    manifest: '/site.webmanifest',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
};

/** Root layout wiring the request locale, app font, theme provider, and analytics. */
const LocaleLayout = async ({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<LocaleParams>;
}) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={montserrat.className}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScroll />
            {children}
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
