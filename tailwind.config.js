/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      width: {
        page: '1450px',
      },

      lineHeight: {
        0: '0',
      },

      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },

      fontFamily: {
        founder: ['founder-youhei', 'sans-serif'],
      },

      colors: {
        /* 主题色 */
        primary1: 'var(--hue-primary-1)',
        primary2: 'var(--hue-primary-2)',
        primary3: 'var(--hue-primary-3)',
        primary4: 'var(--hue-primary-4)',
        primary5: 'var(--hue-primary-5)',
        primary6: 'var(--hue-primary-6)',
        primary7: 'var(--hue-primary-7)',

        /* 背景色 */
        backdrop1: 'var(--hue-bg-1)',
        backdrop2: 'var(--hue-bg-2)',
        backdrop3: 'var(--hue-bg-3)',
        backdrop4: 'var(--hue-bg-4)',
        'backdrop-white': 'var(--hue-bg-white)',

        /* link */
        link1: 'var(--hue-link-1)',
        link2: 'var(--hue-link-2)',

        /* 文字颜色 */
        word1: 'var(--hue-grey-10)',
        word2: 'var(--hue-grey-8)',
        word3: 'var(--hue-grey-6)',
        word4: 'var(--hue-grey-4)',

        /* 边框 */
        rim1: 'var(--hue-grey-2)',
        rim2: 'var(--hue-grey-3)',
        rim3: 'var(--hue-grey-4)',
        rim4: 'var(--hue-grey-6)',

        /* 填充 */
        fill1: 'var(--hue-grey-1)',
        fill2: 'var(--hue-grey-2)',
        fill3: 'var(--hue-grey-3)',
        fill4: 'var(--hue-grey-4)',
      },
    },
  },
  plugins: [],
};
