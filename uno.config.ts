import { defineConfig, presetUno, presetAttributify, presetTypography } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
  theme: {
    width: {
      page: '1450px',
    },

    maxWidth: {
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
    },

    minWidth: {
      /* 320px */
      xs: '20rem',
      /* 384px */
      sm: '24rem',
      /* 448px */
      md: '28rem',
      /* 512px */
      lg: '32rem',
      /* 576px */
      xl: '36rem',
      /* 672px */
      '2xl': '42rem',
      /* 768px */
      '3xl': '48rem',
      /* 896px */
      '4xl': '56rem',
      /* 1024px */
      '5xl': '64rem',
      /* 1152px */
      '6xl': '72rem',
      /* 1280px */
      '7xl': '80rem',
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
      STSerene: ['STSerene', 'sans-serif'],
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
  // 添加 UnoCSS 的默认样式预设
  presets: [presetUno(), presetAttributify(), presetTypography()],
  transformers: [
    // applay theme screen 指令支持
    transformerDirectives(),
    // 前缀组支持
    transformerVariantGroup(),
  ],
});
