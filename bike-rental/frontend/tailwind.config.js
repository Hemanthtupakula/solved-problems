/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0A0A0B',
        darkCard: '#141416',
        cardBorder: 'rgba(255, 255, 255, 0.08)',
        electricTeal: '#00E5C7',
        softGold: '#D4AF37',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'teal-glow': '0 0 25px -5px rgba(0, 229, 199, 0.3)',
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
}
