import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import { useProgress } from "@react-three/drei";
import PortfolioLoader from "./components/PortfolioLoader";
import { useEffect, useState } from "react";


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
        <LoaderGate  />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
