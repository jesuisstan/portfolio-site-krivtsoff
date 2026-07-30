import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';

import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://krivtsoff.online';

// The trailing slash is trimmed so each URL matches the `alternates.canonical` the layout
// renders, which `metadataBase` resolution emits without one.
const urlFor = (locale: Locale) =>
  (SITE_URL + getPathname({ locale, href: '/' })).replace(/\/$/, '');

/** Returns one sitemap entry per locale for the single portfolio route. */
const sitemap = (): MetadataRoute.Sitemap =>
  routing.locales.map((locale) => ({
    url: urlFor(locale),
    lastModified: new Date(),
    alternates: {
      languages: {
        en: urlFor('en'),
        fr: urlFor('fr')
      }
    }
  }));

export default sitemap;
