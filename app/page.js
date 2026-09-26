import Aurora from '@/components/Aurora';
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
import Motion from '@/components/Motion';

export default function Home() {
  return (
    <>
      <Aurora />
      <Header />
      <main id="main" tabIndex={-1} className="relative w-full overflow-x-clip pt-20 focus:outline-none print:pt-0">
        {/* One soft light behind the hero; the aurora does the rest. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 print:hidden">
          <div className="absolute left-1/4 top-20 h-96 w-96 rounded-pill bg-primary/10 blur-[140px]" />
        </div>
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
      <Motion />
    </>
  );
}
