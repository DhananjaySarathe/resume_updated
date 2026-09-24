import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Manual from '@/components/Manual';
import Disciplines from '@/components/Disciplines';
import Experience from '@/components/Experience';
import Systems from '@/components/Systems';
import Projects from '@/components/Projects';
import Stack from '@/components/Stack';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Motion from '@/components/Motion';

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen w-full">
        <Hero />
        <About />
        <Manual />
        <Disciplines />
        <Experience />
        <Systems />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
