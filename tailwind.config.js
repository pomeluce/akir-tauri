/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        page: '1450px',
      },

      colors: {
        primary1: 'var(--r-primary1)',
        primary2: 'var(--r-primary2)',
        primary3: 'var(--r-primary3)',
        primary4: 'var(--r-primary4)',
        primary5: 'var(--r-primary5)',
        primary6: 'var(--r-primary6)',
        primary7: 'var(--r-primary7)',
        primary8: 'var(--r-primary8)',
        primary9: 'var(--r-primary9)',
        primary10: 'var(--r-primary10)',
        primary11: 'var(--r-primary11)',

        backdrop1: 'var(--r-hue-a1)',
        backdrop2: 'var(--r-hue-a2)',
        backdrop3: 'var(--r-hue-a3)',
        backdrop4: 'var(--r-hue-a4)',

        // menu link
        link1: 'var(--r-link1)',
        // '<a/>' link
        link2: 'var(--r-link2)',

        word1: 'var(--r-hue-b1)',
        word2: 'var(--r-hue-b2)',
        word3: 'var(--r-hue-b3)',
        word4: 'var(--r-hue-b4)',
        word5: 'var(--r-hue-b5)',
        word6: 'var(--r-hue-b6)',
        word7: 'var(--r-hue-b7)',
        word8: 'var(--r-hue-b8)',
        word9: 'var(--r-hue-b9)',
        word10: 'var(--r-hue-b10)',
        word11: 'var(--r-hue-b11)',
        word12: 'var(--r-hue-b12)',
        word13: 'var(--r-hue-b13)',
        word14: 'var(--r-hue-b14)',
        word15: 'var(--r-hue-b15)',
        word16: 'var(--r-hue-b16)',
        word17: 'var(--r-hue-b17)',
        word18: 'var(--r-hue-b18)',

        rim1: 'var(--r-hue-b1)',
        rim2: 'var(--r-hue-b2)',
        rim3: 'var(--r-hue-b3)',
        rim4: 'var(--r-hue-b4)',
        rim5: 'var(--r-hue-b5)',
        rim6: 'var(--r-hue-b6)',
        rim7: 'var(--r-hue-b7)',
        rim8: 'var(--r-hue-b8)',
        rim9: 'var(--r-hue-b9)',
        rim10: 'var(--r-hue-b10)',
      },

      fontFamily: {
        founder: ['founder-youhei', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
