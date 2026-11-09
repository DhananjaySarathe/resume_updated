import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Metrics from '@/components/Metrics';
import Disciplines from '@/components/Disciplines';
import Experience from '@/components/Experience';
import Spotlight from '@/components/Spotlight';
import Projects from '@/components/Projects';
import Stack from '@/components/Stack';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="relative w-full overflow-x-clip pt-16 focus:outline-none print:pt-0">
        <Hero />
        <Metrics />
        <Disciplines />
        <Experience />
        <Spotlight />
        <Projects />
        <Stack />
        <Connect />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
