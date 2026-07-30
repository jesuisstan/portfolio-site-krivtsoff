import { defineRouting } from 'next-intl/routing';

/**
 * Locale routing for the site: English is served unprefixed at `/`, French at `/fr`.
 * `as-needed` keeps every existing inbound link to `/` working unchanged.
 */
export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});
