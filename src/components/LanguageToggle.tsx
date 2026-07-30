'use client';

import type { Locale } from 'next-intl';
import { useLocale, useTranslations } from 'next-intl';

import ToggleGroup, { ToggleGroupItem } from '@/components/ui/toggle-group';
import { Link } from '@/i18n/navigation';

interface LocaleOption {
  locale: Locale;
  /** Language code, shown as-is: a code is not translatable copy. */
  code: string;
  labelKey: 'to-english' | 'to-french';
}

const localeOptions: LocaleOption[] = [
  { locale: 'en', code: 'EN', labelKey: 'to-english' },
  { locale: 'fr', code: 'FR', labelKey: 'to-french' }
];

/** Segmented EN/FR switch; each segment links to the page in that locale. */
const LanguageToggle = () => {
  const t = useTranslations('nav');
  const activeLocale = useLocale();

  return (
    <ToggleGroup
      type="single"
      spacing={1}
      value={activeLocale}
      aria-label={t('aria-language')}
      className="h-8 shrink-0 gap-0.5 rounded-full border border-input p-0.5 shadow-ambient"
    >
      {localeOptions.map((option) => (
        <ToggleGroupItem
          key={option.locale}
          value={option.locale}
          asChild
          className="h-7 min-w-7 rounded-full px-2 text-[11px] font-semibold tracking-wide text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          {/* `prefetch={false}` is load-bearing, not an oversight: next-intl's proxy answers any 200
              on a locale route — an RSC prefetch included — with `set-cookie: NEXT_LOCALE`, so
              prefetching `/fr` on load would flip an English reader to French on their next visit.
              The cookie may only move when the visitor actually clicks. */}
          <Link
            href="/"
            locale={option.locale}
            hrefLang={option.locale}
            prefetch={false}
            aria-label={t(option.labelKey)}
          >
            {option.code}
          </Link>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default LanguageToggle;
