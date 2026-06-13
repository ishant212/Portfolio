import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import SkillOrbs from '../components/SkillOrbs';
import { SKILLS } from '../constants';

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-24 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">02 // Skills</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">Tech Stack</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D canvas */}
          <div className="h-[500px] rounded-2xl border border-border overflow-hidden bg-surface/30">
            <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
              <Suspense fallback={null}>
                <SkillOrbs />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={1.2}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Skill categories */}
          <div className="space-y-5">
            {SKILLS.map((cat) => (
              <div
                key={cat.category}
                className="p-5 rounded-xl border border-border bg-surface/30 hover:border-opacity-60 transition-all duration-300 card-glow"
                style={{ '--hover-color': cat.color }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                  />
                  <p className="font-display font-semibold text-text">{cat.category}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-md text-xs font-mono border transition-colors duration-200 hover:bg-white/5"
                      style={{
                        borderColor: `${cat.color}30`,
                        color: cat.color,
                        background: `${cat.color}08`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
