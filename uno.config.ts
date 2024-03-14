import { defineConfig, presetUno, presetAttributify } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
  theme: {
    width: {
      page: '1450px',
    },
    colors: {
      'rify-primary': '#2979ff',
    },
    fontFamily: {
      founder: ['founder-youhei', 'sans-serif'],
    },
  },
  // 添加 UnoCSS 的默认样式预设
  presets: [presetUno(), presetAttributify()],
  transformers: [
    // applay theme screen 指令支持
    transformerDirectives(),
    // 前缀组支持
    transformerVariantGroup(),
  ],
});
