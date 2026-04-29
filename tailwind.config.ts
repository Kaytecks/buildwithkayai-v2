import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#02040a',
        bg2: '#040810',
        cyan: '#00f5ff',
        cyan2: '#00c8ff',
        green: '#00ff88',
        purple: '#8b5cf6',
        pink: '#ff2d9b',
        gold: '#ffd700',
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        head: ['Syne', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'pulse-dot': 'pulseDot 2s infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,245,255,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(0,245,255,0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
