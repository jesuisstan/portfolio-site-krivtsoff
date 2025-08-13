'use client';

import { NavBar } from '@/components/NavBar';
import { Banner } from '@/components/Banner';
import { Stats } from '@/components/Stats';
import { Skills } from '@/components/Skills';
import { TechStack } from '@/components/TechStack';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      <Banner />
      <Stats />
      <Skills />
      <TechStack />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
