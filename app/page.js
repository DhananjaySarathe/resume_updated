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
      <main className="relative w-full overflow-hidden pt-20">
        {/* Ambient light orbs drifting over the aurora */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-20 h-96 w-96 rounded-pill bg-primary/10 blur-[140px]" />
          <div className="absolute right-10 top-[45rem] h-[28rem] w-[28rem] rounded-pill bg-secondary/10 blur-[160px]" />
          <div className="absolute left-10 top-[110rem] h-[32rem] w-[32rem] rounded-pill bg-primary-container/10 blur-[180px]" />
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
