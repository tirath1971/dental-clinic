import type { Config } from 'tailwindcss';

/**
 * Brand tokens for Shining Pearls Dental — "clean & clinical".
 * Colors are derived from a custom palette (not raw Tailwind defaults) so the
 * site reads trustworthy and medical-grade rather than generic.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Off-white clinical surfaces.
        pearl: {
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E7EDF3',
        },
        // Primary clinical blue ramp (sky -> deeper trust blue).
        clinical: {
          50: '#EFF8FE',
          100: '#DAF0FD',
          200: '#BDE5FB',
          300: '#7FD0F8',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#2563EB',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Soft mint accent.
        mint: {
          100: '#E6FBF6',
          200: '#C3F5E9',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
        },
        slate: {
          750: '#293548',
        },
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        // Layered, color-tinted shadows (blue/slate) — not flat shadow-md.
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(14, 165, 233, 0.12)',
        card: '0 1px 3px rgba(15, 23, 42, 0.05), 0 12px 32px -12px rgba(37, 99, 235, 0.16)',
        lift: '0 2px 6px rgba(15, 23, 42, 0.06), 0 24px 48px -16px rgba(37, 99, 235, 0.22)',
        glow: '0 0 0 1px rgba(94, 234, 212, 0.25), 0 18px 50px -18px rgba(14, 165, 233, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
