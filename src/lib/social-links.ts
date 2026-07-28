import type { LucideIcon } from 'lucide-react';
import { Facebook, Github, Instagram, Linkedin } from 'lucide-react';

export interface SocialLink {
  icon: LucideIcon;
  href: string | undefined;
  label: string;
}

// In `lib/` rather than `constants/` because these read the environment.
export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    href: process.env.NEXT_PUBLIC_LINK_GITHUB,
    label: 'GitHub'
  },
  {
    icon: Linkedin,
    href: process.env.NEXT_PUBLIC_LINK_LINKEDIN,
    label: 'LinkedIn'
  },
  {
    icon: Instagram,
    href: process.env.NEXT_PUBLIC_LINK_INSTAGRAM,
    label: 'Instagram'
  },
  {
    icon: Facebook,
    href: process.env.NEXT_PUBLIC_LINK_FACEBOOK,
    label: 'Facebook'
  }
];
