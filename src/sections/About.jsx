import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../constants';

// ── bidirectional IntersectionObserver hook ───────────────────────────
function useScrollInView() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          if (entry.boundingClientRect.bottom < 0) setIsInView(false);
          if (entry.boundingClientRect.top > window.innerHeight) setIsInView(false);
        }
      },
      { threshold: 0, rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

// ── option 2: count-up hook ───────────────────────────────────────────
function useCountUp(target, isInView, duration = 1000) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!isInView) {
      setValue(0);
      return;
    }
    const numeric = parseInt(target, 10);
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * numeric));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isInView, target, duration]);

  // preserve the "+" suffix if present
  return target.includes('+') ? `${value}+` : `${value}`;
}

// ── variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// option 4 — cert card spring pop
const certCard = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 20 },
  },
};

const dotPulse = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
};

// option 3 — education timeline
const lineGrow = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

const eduDot = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: 'spring', stiffness: 350, damping: 18 } },
};

const eduText = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

// ── LeetCode stat cell (option 2) ─────────────────────────────────────
function StatCell({ label, value, color, isInView }) {
  const displayed = useCountUp(value, isInView, 900);
  return (
    <div
      className="rounded-lg p-3 text-center"
      style={{ background: `${color}10`, border: `1px solid ${color}25` }}
    >
      <p className="font-mono font-bold text-lg" style={{ color }}>{displayed}</p>
      <p className="text-xs text-muted mt-0.5">{label}</p>
    </div>
  );
}

// ── education row (option 3) ──────────────────────────────────────────
function EduRow({ edu, isLast, isInView }) {
  return (
    <motion.div
      className="flex gap-4"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="w-3 h-3 rounded-full bg-accent border-2 border-bg mt-1 flex-shrink-0"
          variants={eduDot}
        />
        {!isLast && (
          <motion.div
            className="w-px flex-1 bg-border mt-1"
            style={{ transformOrigin: 'top' }}
            variants={lineGrow}
          />
        )}
      </div>
      <motion.div className="pb-4" variants={eduText}>
        <p className="text-text font-medium">{edu.school}</p>
        <p className="text-dim text-sm">{edu.degree}</p>
        <div className="flex gap-3 mt-1">
          <span className="font-mono text-xs text-muted">{edu.year}</span>
          <span className="font-mono text-xs text-accent">{edu.score}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── main component ────────────────────────────────────────────────────
export default function About() {
  const [headerRef,  headerInView]  = useScrollInView();
  const [leftRef,    leftInView]    = useScrollInView();
  const [leetRef,    leetInView]    = useScrollInView();
  const [rightRef,   rightInView]   = useScrollInView();
  const [eduRef,     eduInView]     = useScrollInView();

  const education = [
    { school: 'VIT Chennai',          degree: 'B.Tech AI/ML',             year: '2023–2027', score: 'CGPA 8.78' },
    { school: 'Pragati Public School', degree: 'Senior Secondary (CBSE)', year: '2022',      score: '93.8%'     },
    { school: 'Holy Mission School',   degree: '10th Grade (CBSE)',        year: '2020',      score: '94.8%'     },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Header — option 1 */}
        <motion.div
          ref={headerRef}
          className="mb-16"
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">01 // About</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">Who I Am</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left column ── */}
          <motion.div
            ref={leftRef}
            className="space-y-6"
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            {/* Bio card */}
            <motion.div
              className="p-6 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm space-y-4"
              variants={slideUp}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl">
                  🎓
                </div>
                <div>
                  <p className="text-text font-semibold">VIT Chennai</p>
                  <p className="text-dim text-sm">B.Tech Artificial Intelligence & ML · 2023–2027</p>
                </div>
                <span className="ml-auto font-mono text-accent text-sm font-bold">8.78 CGPA</span>
              </div>
            </motion.div>

            {/* Bio paragraphs */}
            <motion.p className="text-dim leading-relaxed text-lg" variants={slideUp}>
              I'm a final-year AI/ML student passionate about building things that actually
              work in production. From explainable ML pipelines to microservices backends
              to mobile apps — I care about clean architecture, real metrics, and shipping.
            </motion.p>
            <motion.p className="text-dim leading-relaxed" variants={slideUp}>
              My stack spans Python, Java, TypeScript, and the frameworks that run on top of them.
              I've trained models on 380k+ samples, built Kafka-powered payment services, and shipped
              React Native apps as distributable APKs. Currently interning as an Android Developer
              at Pincodedweb Technology.
            </motion.p>

            {/* Tags */}
            <motion.div className="flex flex-wrap gap-3 pt-2" variants={stagger}>
              {['Python', 'Java', 'TypeScript', 'React', 'Spring Boot', 'FastAPI', 'TensorFlow'].map((t) => (
                <motion.span key={t} className="tag" variants={slideUp}>{t}</motion.span>
              ))}
            </motion.div>

            {/* LeetCode card — option 2 */}
            <motion.a
              ref={leetRef}
              href="https://leetcode.com/u/Ishant_Shekhar/"
              target="_blank"
              rel="noreferrer"
              className="block p-5 rounded-xl border border-border bg-surface/30 hover:border-yellow-500/40 hover:bg-surface/60 transition-all duration-300 group"
              initial="hidden"
              animate={leetInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-lg">⚡</div>
                <div>
                  <p className="text-text font-semibold text-sm">LeetCode</p>
                  <p className="text-muted text-xs font-mono">Ishant_Shekhar</p>
                </div>
                <span className="ml-auto text-muted group-hover:text-yellow-500 transition-colors text-sm">↗</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Easy',   value: '150+', color: '#22c55e' },
                  { label: 'Medium', value: '200+', color: '#f59e0b' },
                  { label: 'Hard',   value: '15+',  color: '#ef4444' },
                ].map((s) => (
                  <StatCell key={s.label} {...s} isInView={leetInView} />
                ))}
              </div>
            </motion.a>
          </motion.div>

          {/* ── Right column ── */}
          <motion.div
            ref={rightRef}
            className="space-y-6"
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            variants={fadeRight}
          >
            {/* Certifications — option 4 */}
            <motion.h3
              className="font-display text-xl font-semibold text-text"
              variants={slideUp}
            >
              Certifications
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 gap-3"
              initial="hidden"
              animate={rightInView ? 'visible' : 'hidden'}
              variants={stagger}
            >
              {CERTIFICATIONS.map((cert) => (
                <motion.div
                  key={cert.name}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/30 hover:border-accent/30 transition-colors duration-200"
                  variants={certCard}
                  whileHover={{
                    x: 4,
                    borderColor: 'rgba(0,245,255,0.3)',
                    transition: { duration: 0.15 },
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-xs font-bold">
                      {cert.issuer === 'Google' ? 'G' : cert.issuer[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-text text-sm font-medium">{cert.name}</p>
                    <p className="text-dim text-xs">{cert.issuer} · {cert.year}</p>
                  </div>
                  {/* option 4 — dot pulse on arrival */}
                  <motion.span
                    className="w-2 h-2 rounded-full bg-accent/60"
                    variants={dotPulse}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Education timeline — option 3 */}
            <div ref={eduRef} className="pt-4 space-y-4">
              <motion.h3
                className="font-display text-xl font-semibold text-text"
                initial="hidden"
                animate={eduInView ? 'visible' : 'hidden'}
                variants={fadeUp}
              >
                Education
              </motion.h3>

              {education.map((edu, i) => (
                <EduRow
                  key={i}
                  edu={edu}
                  isLast={i === education.length - 1}
                  isInView={eduInView}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}