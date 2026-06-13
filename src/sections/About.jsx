import { CERTIFICATIONS } from '../constants';

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">01 // About</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">
            Who I Am
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm space-y-4">
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
            </div>

            <p className="text-dim leading-relaxed text-lg">
              I'm a final-year AI/ML student passionate about building things that actually
              work in production. From explainable ML pipelines to microservices backends
              to mobile apps — I care about clean architecture, real metrics, and shipping.
            </p>
            <p className="text-dim leading-relaxed">
              My stack spans Python, Java, TypeScript, and the frameworks that run on top of them.
              I've trained models on 380k+ samples, built Kafka-powered payment services, and shipped
              React Native apps as distributable APKs. Currently interning as an Android Developer
              at Pincodedweb Technology.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {['Python', 'Java', 'TypeScript', 'React', 'Spring Boot', 'FastAPI', 'TensorFlow'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          {/* LeetCode Card */}
<a
  href="https://leetcode.com/u/Ishant_Shekhar/"
  target="_blank"
  rel="noreferrer"
  className="block p-5 rounded-xl border border-border bg-surface/30 hover:border-yellow-500/40 hover:bg-surface/60 transition-all duration-300 group"
>

  <div className="flex items-center gap-3 mb-4">
    <div className="w-9 h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-lg">
      ⚡
    </div>
    <div>
      <p className="text-text font-semibold text-sm">LeetCode</p>
      <p className="text-muted text-xs font-mono">Ishant_Shekhar</p>
    </div>
    <span className="ml-auto text-muted group-hover:text-yellow-500 transition-colors text-sm">↗</span>
  </div>
  <div className="grid grid-cols-3 gap-3">
    {[
      { label: 'Easy',   value: '150+',  color: '#22c55e' },
      { label: 'Medium', value: '200+',  color: '#f59e0b' },
      { label: 'Hard',   value: '15+',  color: '#ef4444' },
    ].map((s) => (
      <div
        key={s.label}
        className="rounded-lg p-3 text-center"
        style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}
      >
        <p className="font-mono font-bold text-lg" style={{ color: s.color }}>{s.value}</p>
        <p className="text-xs text-muted mt-0.5">{s.label}</p>
      </div>
    ))}
  </div>
</a>

          </div>

          {/* Right — Certifications + education */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold text-text">Certifications</h3>
            <div className="grid grid-cols-1 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/30 hover:border-accent/30 transition-all duration-200"
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
                  <span className="w-2 h-2 rounded-full bg-accent/60" />
                </div>
              ))}
            </div>

            {/* Education timeline */}
            <div className="pt-4 space-y-4">
              <h3 className="font-display text-xl font-semibold text-text">Education</h3>
              {[
                { school: 'VIT Chennai', degree: 'B.Tech AI/ML', year: '2023–2027', score: 'CGPA 8.78' },
                { school: 'Pragati Public School', degree: 'Senior Secondary (CBSE)', year: '2022', score: '93.8%' },
                { school: 'Holy Mission School', degree: '10th Grade (CBSE)', year: '2020', score: '94.8%' },
              ].map((edu, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-accent border-2 border-bg mt-1 flex-shrink-0" />
                    {i < 2 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-text font-medium">{edu.school}</p>
                    <p className="text-dim text-sm">{edu.degree}</p>
                    <div className="flex gap-3 mt-1">
                      <span className="font-mono text-xs text-muted">{edu.year}</span>
                      <span className="font-mono text-xs text-accent">{edu.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}