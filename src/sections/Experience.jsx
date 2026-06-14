import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE } from '../constants';

function TimelineSphere() {
  const groupRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
  });
  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        const colors = ['#00f5ff', '#7c3aed', '#f59e0b', '#10b981', '#ef4444'];
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial
              color={colors[i]}
              emissive={colors[i]}
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );
      })}
      <mesh>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
      </mesh>
      <pointLight color="#00f5ff" intensity={2} distance={10} />
    </group>
  );
}

// ── Variants ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const dotVariants = {
  hidden: { scale: 0, boxShadow: '0 0 0px transparent' },
  visible: (color) => ({
    scale: 1,
    boxShadow: `0 0 12px ${color}80`,
    transition: { duration: 0.3, ease: 'backOut' },
  }),
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const bulletVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (j) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.2 + j * 0.07,
      ease: 'easeOut',
    },
  }),
};

// ── Single timeline entry ─────────────────────────────────────────────
function ExperienceItem({ exp, isLast }) {
  const ref = useRef(null);
  // ✅ once: false so it reverses when scrolled out
  const isInView = useInView(ref, { once: false, margin: '0px 0px 60px 0px' });

  return (
    <motion.div
      ref={ref}
      className="flex gap-6"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-bg mt-6 z-10 flex-shrink-0"
          style={{ background: exp.color }}
          custom={exp.color}
          variants={dotVariants}
        />
        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-1"
            style={{
              background: `${exp.color}30`,
              transformOrigin: 'top',
            }}
            variants={lineVariants}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 mb-8 p-5 rounded-xl border bg-surface/30 hover:bg-surface/60 transition-colors duration-300"
        style={{ borderColor: `${exp.color}25` }}
        variants={cardVariants}
      >
        <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
          <div>
            <h3 className="font-display font-bold text-text">{exp.role}</h3>
            <p className="text-sm font-medium" style={{ color: exp.color }}>
              {exp.company}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono text-dim">{exp.period}</p>
            <p className="text-xs text-muted">{exp.type}</p>
          </div>
        </div>
        <ul className="space-y-1 mt-3">
          {exp.points.map((pt, j) => (
            <motion.li
              key={j}
              custom={j}
              variants={bulletVariants}
              className="text-sm text-dim flex gap-2"
            >
              <span style={{ color: exp.color }} className="mt-1 flex-shrink-0">
                ▸
              </span>
              {pt}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────
export default function Experience() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false, margin: '0px 0px -60px 0px' });

  return (
    <section id="experience" className="min-h-screen py-24 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          // ✅ explicit reverse target — not {}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">
            04 // Experience
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">
            Career Journey
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D canvas */}
          <motion.div
            className="h-[400px] rounded-2xl border border-border overflow-hidden bg-surface/30 order-last lg:order-first"
            initial={{ opacity: 0, scale: 0.95 }}
            // ✅ explicit reverse target — not {}
            animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} color="#7c3aed" intensity={1.5} />
                <TimelineSphere />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.8}
                />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-0">
            {EXPERIENCE.map((exp, i) => (
              <ExperienceItem
                key={i}
                exp={exp}
                index={i}
                isLast={i === EXPERIENCE.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}