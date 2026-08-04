import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import Banner from '@/components/Banner';
import Contact from '@/components/Contact';
import CurtainStage from '@/components/CurtainStage';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Projects from '@/components/Projects';
import ScrollToTop from '@/components/ScrollToTop';
import SkillsAndTech from '@/components/SkillsAndTech';
import { routing } from '@/i18n/routing';

/** Renders the single-page portfolio with every section in order. */
const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="flex min-h-svh flex-col">
      {/* The content layer, under the footer panel. `bg-background` is load-bearing: the alternating
          section tones are translucent and would leak the panel's particle field through. */}
      <main className="relative z-10 bg-background">
        <NavBar />
        <Banner />
        <SkillsAndTech />
        <Experience />
        <Projects />
        {/* Contact is the page's last word, so the curtain draws over it while it holds still. */}
        <CurtainStage>
          <Contact />
        </CurtainStage>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
