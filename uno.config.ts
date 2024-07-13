import { defineConfig, presetUno, presetAttributify, presetTypography } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        blink: '{ 0%{ opacity: 0 } 100%{ opacity: 1 } }',
      },
      durations: {
        blink: '.8s',
      },
      timingFns: {
        blink: 'ease',
      },
      counts: {
        blink: 'infinite',
      },
    },

    width: {
      page: '1450px',
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
