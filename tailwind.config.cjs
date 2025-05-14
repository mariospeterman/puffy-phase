/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#dfeaff',
          200: '#c7d9ff',
          300: '#a0bfff',
          400: '#799fff',
          500: '#5284ff', // ENS primary blue
          600: '#3e69da',
          700: '#2e51b0',
          800: '#294490',
          900: '#263c76',
          950: '#111b38',
        },
        secondary: {
          // ENS gold
          50: '#fffaeb',
          100: '#fff1c6',
          200: '#ffe799',
          300: '#ffda66',
          400: '#ffca33',
          500: '#ffbf23', // ENS gold accent
          600: '#ffa800',
          700: '#cc7a00',
          800: '#a65b0b',
          900: '#86490f',
          950: '#482500',
        },
        mint: {
          50: '#f1fbf3',
          100: '#dcf4e2',
          200: '#c3e5cd', // ENS mint green
          300: '#94d3a8',
          400: '#68b982',
          500: '#479c65',
          600: '#367e50',
          700: '#2d6542',
          800: '#285137',
          900: '#233d33', // Dark version
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        dark: '#151c31', // ENS dark background
        light: '#f8fafc', // Slate 50
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'float-delay-2': 'float 6s ease-in-out 4s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(82, 132, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(82, 132, 255, 0.05) 1px, transparent 1px)',
        'card-gradient': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        'card-gradient-dark': 'linear-gradient(135deg, #1a2136 0%, #151c31 100%)',
      },
      borderRadius: {
        'ens': '12px',
      },
      boxShadow: {
        'ens': '0 5px 20px rgba(0, 0, 0, 0.05)',
        'ens-hover': '0 10px 25px rgba(0, 0, 0, 0.08)',
        'ens-dark': '0 5px 20px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}; 