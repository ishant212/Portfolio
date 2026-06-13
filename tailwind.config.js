/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: '#050810',
        surface: '#0d1117',
        border: '#1e2a3a',
        accent: '#00f5ff',
        accent2: '#7c3aed',
        muted: '#4a5568',
        text: '#e2e8f0',
        dim: '#94a3b8',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fadeUp': 'fadeUp 0.8s ease forwards',
        'slideIn': 'slideIn 0.6s ease forwards',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        glow: { from: { textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff' }, to: { textShadow: '0 0 20px #00f5ff, 0 0 40px #7c3aed' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(40px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn: { from: { opacity: 0, transform: 'translateX(-30px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
