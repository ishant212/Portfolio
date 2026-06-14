import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillOrbs from '../components/SkillOrbs';
import { SKILLS } from '../constants';

// ── Variants ──────────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (j) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 18,
      delay: 0.25 + j * 0.06,
    },
  }),
};

// ── Single category card ──────────────────────────────────────────────
function SkillCard({ cat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
      className="p-5 rounded-xl border border-border bg-surface/30 transition-colors duration-300"
      style={{ '--hover-color': cat.color }}
      whileHover={{
        borderColor: `${cat.color}50`,
        backgroundColor: 'rgba(255,255,255,0.03)',
        transition: { duration: 0.2 },
      }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{ background: cat.color }}
          initial={{ scale: 0, boxShadow: 'none' }}
          animate={
            isInView
              ? {
                  scale: 1,
                  boxShadow: `0 0 8px ${cat.color}`,
                }
              : {}
          }
          transition={{ duration: 0.3, delay: index * 0.1 + 0.1, ease: 'backOut' }}
        />
        <p className="font-display font-semibold text-text">{cat.category}</p>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {cat.items.map((item, j) => (
          <motion.span
            key={item}
            custom={j}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={pillVariants}
            // ── Option 2: hover lift + glow ──────────────────────────
            whileHover={{
              y: -3,
              boxShadow: `0 4px 12px ${cat.color}30`,
              borderColor: `${cat.color}60`,
              backgroundColor: `${cat.color}15`,
              transition: { duration: 0.15 },
            }}
            className="px-3 py-1 rounded-md text-xs font-mono border cursor-default"
            style={{
              borderColor: `${cat.color}30`,
              color: cat.color,
              background: `${cat.color}08`,
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────
export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <section id="skills" className="min-h-screen py-24 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">
            02 // Skills
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">
            Tech Stack
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D canvas */}
          <motion.div
            className="h-[500px] rounded-2xl border border-border overflow-hidden bg-surface/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
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
          </motion.div>

          {/* Skill categories */}
          <div className="space-y-5">
            {SKILLS.map((cat, i) => (
              <SkillCard key={cat.category} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}