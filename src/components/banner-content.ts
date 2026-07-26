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
  label: string;
  suffix: string;
}

export interface BannerSocialLink {
  label: string;
  href: string | undefined;
  icon: LucideIcon;
}

/** Hero stat counters, in render order. */
export const bannerStats: BannerStat[] = [
  {
    key: 'projects',
    icon: FolderOpen,
    number: 30,
    label: 'Projects Completed',
    suffix: '+'
  },
  {
    key: 'experience',
    icon: Briefcase,
    number: 3,
    label: 'Years Experience',
    suffix: '+'
  },
  {
    key: 'hours',
    icon: Clock,
    number: 5000,
    label: 'Hours Coded',
    suffix: '+'
  },
  {
    key: 'certifications',
    icon: Award,
    number: 3,
    label: 'IT Certifications',
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
