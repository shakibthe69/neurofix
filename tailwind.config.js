/**
 * Every integer opacity step from 0 to 100.
 *
 * Tailwind's default opacity scale is sparse (5, 10, 20, 25, …), and the
 * colour-opacity modifier (`border-white/12`) resolves against that scale.
 * Design tokens like /12, /15, /18 and /85 read much better in markup than the
 * bracketed equivalent, so the full range is registered here.
 */
const opacityScale = Object.fromEntries(
  Array.from({ length: 101 }, (_, value) => [value, String(value / 100)]),
)

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      opacity: opacityScale,
      colors: {
        // Brand palette (see README > Design system)
        ink: {
          DEFAULT: '#080D19',
          soft: '#0D1425',
          line: '#1B2440',
        },
        brand: {
          50: '#EEF4FF',
          100: '#DCE7FF',
          200: '#BBD0FF',
          300: '#8FAEFF',
          400: '#5E8CFA',
          500: '#3478F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        violet: {
          400: '#9E7BFA',
          500: '#8054F6',
          600: '#6D3BE8',
        },
        body: '#64748B',
        mist: '#F5F8FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Fluid display sizes so headings scale without breakpoint juggling
        'display-xl': ['clamp(2.5rem, 5.2vw, 4.25rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.6rem, 2.8vw, 2.35rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.6rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(8,13,25,0.04), 0 12px 32px -12px rgba(8,13,25,0.12)',
        lift: '0 24px 60px -24px rgba(8,13,25,0.28)',
        glow: '0 0 0 1px rgba(52,120,246,0.28), 0 18px 48px -18px rgba(52,120,246,0.55)',
        'glow-violet': '0 18px 48px -18px rgba(128,84,246,0.55)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #3478F6 0%, #8054F6 100%)',
        'brand-gradient-soft': 'linear-gradient(120deg, rgba(52,120,246,0.12) 0%, rgba(128,84,246,0.12) 100%)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(to right, rgba(8,13,25,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,13,25,0.05) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.85' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}
