/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fira: ["'Fira Sans', sans-serif"],
        pacifico: [" 'Pacifico', cursive"],
        fredoka: ["'Fredoka One', cursive"],
        allerta: ["'Allerta', sans-serif"],
      },
      backgroundImage: {
        // mobile: "url('./public/olxlanding.png')",
      },
      animation: {
        'bounce-slow': 'bounce 2s linear infinite',
        'slow-bounce': 'slow-bounce 2s ease-in-out infinite',
        'bounce-avatar': 'bounce-avatar 2s ease-in-out infinite',
      },
      keyframes: {
        'slow-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bounce-avatar': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
