import { useState } from 'react';
import { SOCIALS } from '../constants';
import FloatingCore from "../components/FloatingCore";
import { Canvas } from "@react-three/fiber";

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    setSending(true);

    const subject = encodeURIComponent(
      `Portfolio Contact from ${form.name}`
    );

    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name} (${form.email})`
    );

    setTimeout(() => {
      window.location.href = `mailto:${SOCIALS.email}?subject=${subject}&body=${body}`;

      setSending(false);
      setSent(true);

      setForm({
        name: '',
        email: '',
        message: '',
      });
    }, 800);
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-24 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">
            05 // Contact
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">
            Let's Work Together
          </h2>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 max-w-6xl mx-auto">
          {/* Left Side */}
          {/* Contact info */}
<div className="space-y-8">

  {/* Floating Core */}
  <div className="h-64 flex flex-col items-center justify-center -translate-y-6">
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={1} />
      <FloatingCore />
    </Canvas>

  </div>

  {/* Contact Cards */}
  <div className="space-y-4 mt-16">
    {[
      {
        icon: '⌨',
        label: 'GitHub',
        value: 'github.com/ishant212',
        href: SOCIALS.github,
      },
      {
        icon: '💼',
        label: 'LinkedIn',
        value: 'linkedin.com/in/ishant-shekhar-eeshu',
        href: SOCIALS.linkedin,
      },
    ].map((item) => (
      <a
        key={item.label}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/30 hover:border-accent/40 hover:bg-surface/60 transition-all duration-300 group"
      >
        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-lg">
          {item.icon}
        </div>

        <div>
          <p className="text-xs text-muted uppercase tracking-widest font-mono">
            {item.label}
          </p>

          <p className="text-text text-sm group-hover:text-accent transition-colors">
            {item.value}
          </p>
        </div>

        <span className="ml-auto text-muted group-hover:text-accent transition-colors">
          →
        </span>
      </a>
    ))}
  </div>

</div>

          {/* Right Side Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {[
              {
                name: 'name',
                label: 'Your Name',
                type: 'text',
                placeholder: 'John Doe',
              },
              {
                name: 'email',
                label: 'Email Address',
                type: 'email',
                placeholder: 'john@company.com',
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-dim mb-2 font-mono">
                  {field.label}
                </label>

                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-colors duration-200 text-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm text-dim mb-2 font-mono">
                Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Hi Ishant, I'd love to discuss..."
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-accent text-bg font-semibold hover:bg-accent/90 disabled:opacity-60 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                  Sending...
                </>
              ) : sent ? (
                '✓ Message Sent!'
              ) : (
                'Send Message →'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-border pt-8 text-center">
        <p className="text-muted text-sm font-mono">
          Built with React + Three.js · © 2026 Ishant Shekhar Eeshu
        </p>
      </div>
    </section>
  );
}