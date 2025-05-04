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
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          dark: 'var(--secondary-dark)',
        },
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        gray: {
          light: 'var(--gray-light)',
          medium: 'var(--gray-medium)',
          dark: 'var(--gray-dark)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn var(--transition-normal) ease-in-out',
        'slide-up': 'slideUp var(--transition-normal) ease-out',
        'slide-in-right': 'slideInRight var(--transition-normal) ease-out',
        'slide-in-left': 'slideInLeft var(--transition-normal) ease-out',
        'pulse': 'pulse 2s infinite',
        'bounce-subtle': 'bounce-subtle 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float-delay 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-slow-reverse': 'spin-slow-reverse 25s linear infinite',
        'blob': 'blob 7s infinite',
      },
    },
  },
  plugins: [],
};
