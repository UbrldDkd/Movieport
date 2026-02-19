export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'drop-expand-fade': {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
            'box-shadow': '0 0 0 0px rgb(69 10 10 / 1)',
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0',
            'box-shadow': '0 0 0 40px rgb(69 10 10 / 0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.35s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'drop-expand-fade': 'drop-expand-fade 500ms ease-out forwards',
      },
      colors: {
        // flat keys — these generate usable Tailwind classes
        primary: '#1E40AF',
      },
    },
  },
  plugins: [],
};
