/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#FFE033",
          500: "#FFD700",
          600: "#D4AF37",
          700: "#AA820A",
        },
        red: {
          600: "#DC2626",
          700: "#B91C1C",
        },
        green: {
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
        brandDark: {
          900: "#0b0f19",
          800: "#111827",
          700: "#1f293d",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite alternate',
        'ribbon-wave': 'ribbonWave 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(22, 163, 74, 0.6)', transform: 'scale(1)' },
          '50%': { boxShadow: '0 0 35px rgba(22, 163, 74, 0.95), 0 0 45px rgba(255, 215, 0, 0.4)', transform: 'scale(1.03)' },
        },
        sparkle: {
          '0%': { opacity: '0.3', transform: 'scale(0.8) rotate(0deg)' },
          '100%': { opacity: '1', transform: 'scale(1.2) rotate(15deg)' },
        },
        ribbonWave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
