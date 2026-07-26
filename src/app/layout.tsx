import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';

import ThemeProvider from '@/components/ThemeProvider';

import '@/styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://krivtsoff.online'),
  title: 'Stanislav Krivtsoff - Frontend Developer',
  description:
    'Frontend developer focused on React, Next.js, and TypeScript. Building product UIs, data visualization, and scalable web experiences.',
  keywords:
    'Frontend Developer, React, Next.js, TypeScript, Web Development, UI, Paris',
  authors: [{ name: 'Stanislav Krivtsoff' }],
  creator: 'Stanislav Krivtsoff',
  openGraph: {
    title: 'Stanislav Krivtsoff - Frontend Developer',
    description:
      'Frontend developer focused on React, Next.js, and TypeScript.',
    url: 'https://krivtsoff.online',
    siteName: 'Stanislav Krivtsoff Portfolio',
    images: [
      {
        url: '/avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'Stanislav Krivtsoff - Frontend Developer'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stanislav Krivtsoff - Frontend Developer',
    description:
      'Frontend developer focused on React, Next.js, and TypeScript.',
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

/** Root layout wiring the app font, theme provider, and analytics. */
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
