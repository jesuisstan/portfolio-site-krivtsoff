'use client';

import { Banner } from '@/components/Banner';
import { Contact } from '@/components/Contact';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';
import { Projects } from '@/components/Projects';
import { SkillsAndTech } from '@/components/SkillsAndTech';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      <Banner />
      <SkillsAndTech />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
