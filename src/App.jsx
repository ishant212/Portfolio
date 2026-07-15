import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import { useProgress } from "@react-three/drei";
import PortfolioLoader from "./components/PortfolioLoader";
import SectionShell from "./components/SectionShell";

// Below-fold sections are lazy-loaded so their JS is not parsed during the
// initial page load. Each section resolves to its own dynamic chunk.
//
// Eager (above-fold / immediately needed):  Navbar, Hero, About
// Lazy  (below-fold / deferred):            Skills, Projects, Experience, Contact
const Skills     = lazy(() => import('./sections/Skills'));
const Projects   = lazy(() => import('./sections/Projects'));
const Experience = lazy(() => import('./sections/Experience'));
const Contact    = lazy(() => import('./sections/Contact'));


function LoaderGate() {
  const { active } = useProgress();

  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!active && minTimePassed) {
      setFadeOut(true);

      setTimeout(() => {
        setShowLoader(false);
      }, 700);
    }
  }, [active, minTimePassed]);

  if (!showLoader) return null;

  return <PortfolioLoader fadeOut={fadeOut} />;
}

export default function App() {
  return (
    <div className="noise-bg bg-bg min-h-screen">
      <LoaderGate />
      <Navbar />
      <main>
        {/* Eager — above-fold, must be available immediately */}
        <Hero />
        <About />

        {/* Lazy — each section in its own Suspense so one slow chunk
            does not block the others from mounting */}
        <Suspense fallback={<SectionShell />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionShell />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionShell />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionShell />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}
