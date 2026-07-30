import type { LucideIcon } from 'lucide-react';
import {
  Award,
  Briefcase,
  Clock,
  FolderOpen,
  Github,
  Linkedin
} from 'lucide-react';

export interface BannerStatCounts {
  projects: number;
  experience: number;
  hours: number;
  certifications: number;
}

export interface BannerStat {
  key: keyof BannerStatCounts;
  icon: LucideIcon;
  number: number;
  suffix: string;
}

export interface BannerSocialLink {
  label: string;
  href: string | undefined;
  icon: LucideIcon;
}

// Labels live in `src/i18n/messages/*.json` under `banner.stats.<key>`.
/** Hero stat counters, in render order. */
export const bannerStats: BannerStat[] = [
  {
    key: 'projects',
    icon: FolderOpen,
    number: 30,
    suffix: '+'
  },
  {
    key: 'experience',
    icon: Briefcase,
    number: 3,
    suffix: '+'
  },
  {
    key: 'hours',
    icon: Clock,
    number: 5000,
    suffix: '+'
  },
  {
    key: 'certifications',
    icon: Award,
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
