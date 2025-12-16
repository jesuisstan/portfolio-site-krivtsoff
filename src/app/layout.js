import { Analytics } from '@vercel/analytics/next';
import { Montserrat } from 'next/font/google';

import { ThemeProvider } from '@/components/ThemeProvider';

import '@/styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://krivtsoff.me'),
  title: 'Stanislav Krivtsoff - Full-Stack Developer',
  description:
    'Full-stack developer specializing in React, Node.js, and modern web technologies. Creating innovative digital experiences and scalable applications.',
  keywords:
    'Full-Stack Developer, React, Node.js, TypeScript, Next.js, Web Development, Paris',
  authors: [{ name: 'Stanislav Krivtsoff' }],
  creator: 'Stanislav Krivtsoff',
  openGraph: {
    title: 'Stanislav Krivtsoff - Full-Stack Developer',
    description:
      'Full-stack developer specializing in React, Node.js, and modern web technologies.',
    url: 'https://krivtsoff.me',
    siteName: 'Stanislav Krivtsoff Portfolio',
    images: [
      {
        url: '/avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'Stanislav Krivtsoff - Full-Stack Developer'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stanislav Krivtsoff - Full-Stack Developer',
    description:
      'Full-stack developer specializing in React, Node.js, and modern web technologies.',
    images: ['/avatar.jpg']
  },
  icons: {
    icon: ['/favicon.ico?v-4'],
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

export default function RootLayout({ children }) {
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
}
