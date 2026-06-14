import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SOCIALS } from '../constants';
import FloatingCore from "../components/FloatingCore";
import { Canvas } from "@react-three/fiber";

// ── reusable bidirectional hook (same as Experience fix) ──────────────
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

// ── variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── contact link card ─────────────────────────────────────────────────
function ContactCard({ item }) {
  return (
    <motion.a
      variants={cardVariant}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/30 transition-all duration-300 group"
      whileHover={{
        borderColor: 'rgba(0,245,255,0.4)',
        backgroundColor: 'rgba(255,255,255,0.04)',
        x: 4,
        transition: { duration: 0.2 },
      }}
    >
      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-lg">
        {item.icon}
      </div>
      <div>
        <p className="text-xs text-muted uppercase tracking-widest font-mono">{item.label}</p>
        <p className="text-text text-sm group-hover:text-accent transition-colors">{item.value}</p>
      </div>
      <motion.span
        className="ml-auto text-muted"
        whileHover={{ x: 4, color: 'var(--color-accent)' }}
        transition={{ duration: 0.15 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [headerRef, headerInView]   = useScrollInView();
  const [leftRef,   leftInView]     = useScrollInView();
  const [rightRef,  rightInView]    = useScrollInView();
  const [footerRef, footerInView]   = useScrollInView();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body    = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    setTimeout(() => {
      window.location.href = `mailto:${SOCIALS.email}?subject=${subject}&body=${body}`;
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }, 800);
  };

  const links = [
    { icon: '⌨', label: 'GitHub',   value: 'github.com/ishant212',                href: SOCIALS.github   },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/ishant-shekhar-eeshu', href: SOCIALS.linkedin },
  ];

  return (
    <section id="contact" className="min-h-screen py-24 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mb-16 text-center"
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">
            05 // Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">
            Let's Work Together
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 max-w-6xl mx-auto">

          {/* Left — canvas + social cards */}
          <motion.div
            ref={leftRef}
            className="space-y-8"
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            variants={fadeLeft}
          >
            {/* Floating Core canvas */}
            <motion.div
              className="h-64 flex flex-col items-center justify-center -translate-y-6"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
              }}
            >
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={1} />
                <FloatingCore />
              </Canvas>
            </motion.div>

            {/* Social cards stagger */}
            <motion.div
              className="space-y-4 mt-16"
              variants={staggerContainer}
            >
              {links.map((item) => (
                <ContactCard key={item.label} item={item} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            ref={rightRef}
            onSubmit={handleSubmit}
            className="space-y-5"
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            variants={fadeRight}
          >
            {[
              { name: 'name',    label: 'Your Name',      type: 'text',  placeholder: 'John Doe'          },
              { name: 'email',   label: 'Email Address',  type: 'email', placeholder: 'john@company.com'  },
            ].map((field, i) => (
              <motion.div
                key={field.name}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
                  },
                }}
              >
                <label className="block text-sm text-dim mb-2 font-mono">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-colors duration-200 text-sm"
                />
              </motion.div>
            ))}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.16, ease: 'easeOut' } },
              }}
            >
              <label className="block text-sm text-dim mb-2 font-mono">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Hi Ishant, I'd love to discuss..."
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none text-sm"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-accent text-bg font-semibold disabled:opacity-60 transition-all duration-200 flex items-center justify-center gap-2"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.24, ease: 'easeOut' } },
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98 }}
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                  Sending...
                </>
              ) : sent ? '✓ Message Sent!' : 'Send Message →'}
            </motion.button>
          </motion.form>

        </div>
      </div>

      {/* Footer */}
      <motion.div
        ref={footerRef}
        className="mt-24 border-t border-border pt-8 text-center"
        initial="hidden"
        animate={footerInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
        }}
      >
        <p className="text-muted text-sm font-mono">
          Built with React + Three.js · © 2026 Ishant Shekhar Eeshu
        </p>
      </motion.div>
    </section>
  );
}