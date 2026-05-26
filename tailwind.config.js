/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        orbit: 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit 15s linear infinite reverse',
        'orbit-fast': 'orbit 10s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.3)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(6, 182, 212, 0.15)',
        'indigo-glow': '0 0 25px rgba(99, 102, 241, 0.15)',
        'violet-glow': '0 0 25px rgba(139, 92, 246, 0.15)',
        'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.04), 0 0 20px rgba(6, 182, 212, 0.05)',
      },
    },
  },
  plugins: [],
}
