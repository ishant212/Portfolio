import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import {
  EffectComposer,
  Bloom
} from "@react-three/postprocessing"; 

import ProjectCylinder from "../components/ProjectCylinder";

import ParticleField from '../components/ParticleField';
import { OrbitControls } from '@react-three/drei';
import { SOCIALS } from '../constants';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Particle Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ParticleField count={1500} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-bg/95 via-bg/25 to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          {/* Name */}
          <div className="space-y-2">
            <p className="text-dim text-lg font-mono tracking-widest uppercase">
              Hello, I'm
            </p>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-none">
              <span className="text-text">Ishant</span>
              <br />
              <span className="gradient-text animate-glow">Shekhar</span>
              <br />
              <span className="text-text">Eeshu</span>
            </h1>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <p className="text-xl text-dim">
              <span className="text-accent font-mono">
                AI/ML Engineer
              </span>{' '}
              &amp;{' '}
              <span className="text-accent2 font-mono">
                Full-Stack Developer
              </span>
            </p>

            <p className="text-dim max-w-lg leading-relaxed">
              B.Tech AI/ML @ VIT Chennai (CGPA 8.78) · Building
              production-grade ML pipelines, async backends &amp;
              generative AI integrations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`https://www.linkedin.com/in/ishant-shekhar-eeshu/`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:scale-105"
            >
              Get In Touch
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-border text-text rounded-lg hover:border-accent/40 hover:text-accent transition-all duration-200"
            >
              View Resume
            </a>

            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-border text-dim rounded-lg hover:border-accent2/40 hover:text-accent2 transition-all duration-200"
            >
              GitHub ↗
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            {[
              { label: 'Projects', value: '10+' },
              { label: 'CGPA', value: '8.75' },
              { label: 'Certs', value: '4+' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-accent">
                  {s.value}
                </p>
                <p className="text-xs text-dim uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - DESK */}
<div className="h-[650px] lg:h-[750px] relative">
  <Canvas
    camera={{ position: [0, 0, 6], fov: 35 }}
    gl={{ antialias: true }}
  >
    <Suspense fallback={null}>

      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <ProjectCylinder />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />

      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={0}
          luminanceThreshold={0.2}
        />
      </EffectComposer>

    </Suspense>
  </Canvas>
</div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-dim font-mono tracking-widest">
          SCROLL
        </span>

        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </div>
    </section>
  );
}
