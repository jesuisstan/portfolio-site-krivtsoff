import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin } from 'lucide-react';

export type BannerStatKey =
  'projects' | 'experience' | 'hours' | 'certifications';

export interface BannerStat {
  key: BannerStatKey;
  number: number;
  suffix: string;
}

export interface BannerSocialLink {
  label: string;
  href: string | undefined;
  icon: LucideIcon;
}

// The same in both languages; only the words around them come from `banner.role`.
/** Words the hero's role line rolls through, in order; the last is the one it rests on. */
export const bannerRoleWords = [
  'Frontend',
  'Web & Mobile',
  'React',
  'Next.js',
  'TypeScript',
  'Full-Stack'
] as const;

// Labels live in `src/i18n/messages/*.json` under `banner.stats.<key>`.
/** Hero facts, in render order. */
export const bannerStats: BannerStat[] = [
  {
    key: 'projects',
    number: 30,
    suffix: '+'
  },
  {
    key: 'experience',
    number: 3,
    suffix: '+'
  },
  {
    key: 'hours',
    number: 5000,
    suffix: '+'
  },
  {
    key: 'certifications',
    number: 3,
    suffix: ''
  }
];

/** Social profile links shown beside the hero call-to-action buttons. */
export const bannerSocialLinks: BannerSocialLink[] = [
  {
    label: 'GitHub',
    href: process.env.NEXT_PUBLIC_LINK_GITHUB,
    icon: Github
  },
  {
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINK_LINKEDIN,
    icon: Linkedin
  }
];
