import Banner from '@/components/Banner';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Projects from '@/components/Projects';
import ScrollToTop from '@/components/ScrollToTop';
import SkillsAndTech from '@/components/SkillsAndTech';

/** Renders the single-page portfolio with every section in order. */
const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      <Banner />
      <SkillsAndTech />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Home;
