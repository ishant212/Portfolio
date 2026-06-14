import { useEffect, useRef, useState } from "react";

/* ---------------- Hooks ---------------- */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function useCounter(target, inView, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = target / 60;

    const interval = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / 60);

    return () => clearInterval(interval);
  }, [target, inView, duration]);

  return count;
}

/* ---------------- Reusable Card ---------------- */

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-border bg-surface/50 backdrop-blur-md p-6 hover:border-accent/40 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------- Stats Card ---------------- */

function StatCard({ value, label, suffix = "" }) {
  const [ref, inView] = useInView();
  const count = useCounter(value, inView);

  return (
    <Card>
      <div ref={ref}>
        <h3 className="text-3xl font-bold text-accent">
          {count}
          {suffix}
        </h3>
        <p className="text-dim mt-1">{label}</p>
      </div>
    </Card>
  );
}

/* ---------------- Education Timeline Item ---------------- */

function EduItem({ icon, title, subtitle, score, period, isLast = false }) {
  return (
    <div className="relative pl-12">
      {/* connecting line */}
      {!isLast && (
        <span className="absolute left-[15px] top-10 bottom-0 w-px bg-border" />
      )}

      {/* icon node */}
      <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-base">
        {icon}
      </span>

      <div className={isLast ? "" : "pb-10"}>
        <p className="font-semibold text-text text-lg">{title}</p>
        <p className="text-dim text-sm mt-1">{subtitle}</p>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {period && (
            <span className="text-accent text-sm font-mono">{period}</span>
          )}
          {score && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
              {score}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Certification Card ---------------- */

function CertCard({ icon, name, issuer }) {
  return (
    <Card className="!p-4 flex items-center gap-4 hover:scale-[1.02]">
      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl shrink-0">
        {icon}
      </div>

      <div>
        <p className="font-medium text-text">{name}</p>
        {issuer && <p className="text-dim text-xs mt-0.5">{issuer}</p>}
      </div>
    </Card>
  );
}

/* ---------------- Main ---------------- */

export default function Education() {
  return (
    <section id="education" className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-14">
          <p className="font-mono text-accent tracking-widest uppercase text-sm">
            02 // Education & Certifications
          </p>

          <h2 className="text-5xl font-bold text-text mt-2">
            Academic Foundation & Credentials
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 items-start">

          {/* Education Timeline */}
          <Card className="lg:col-span-2">
            <h3 className="font-semibold text-lg text-text mb-8">
              Education
            </h3>

            <div>
              <EduItem
                icon="🎓"
                title="VIT Chennai"
                subtitle="B.Tech in Artificial Intelligence & Machine Learning"
                period="2023 – 2027"
                score="CGPA 8.78"
              />

              <EduItem
                icon="🏫"
                title="Pragati Public School"
                subtitle="CBSE Class XII"
                score="93.8%"
              />

              <EduItem
                icon="🏫"
                title="Holy Mission School"
                subtitle="CBSE Class X"
                score="94.8%"
                isLast
              />
            </div>
          </Card>

          {/* Sidebar: highlight stat + certifications */}
          <div className="flex flex-col gap-5">
            <StatCard value={8} suffix=".78" label="Current CGPA" />

            <Card>
              <h3 className="font-semibold text-lg text-text mb-4">
                Certifications
              </h3>

              <div className="flex flex-col gap-3">
                <CertCard icon="☁️" name="Google Cloud" issuer="Cloud Computing" />
                <CertCard icon="✨" name="Generative AI" issuer="AI / ML" />
                <CertCard icon="🧠" name="Machine Learning" issuer="AI / ML" />
                <CertCard icon="⛓️" name="Blockchain" issuer="Web3" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}