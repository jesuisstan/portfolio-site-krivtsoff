// Augments next-intl with this project's locale union and message shape, so `useTranslations`
// keys, `t.raw()` returns and `Locale` are all checked against `src/i18n/messages/en.json`.
import type messages from '@/i18n/messages/en.json';
import type { routing } from '@/i18n/routing';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
