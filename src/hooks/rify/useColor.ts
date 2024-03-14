import { composite } from 'seemly';

export default () => {
  /**
   * 获取两种颜色的合成颜色的rgba格式字符串
   * @param color - 主色 {@link string}
   * @param overlay - 辅色 {@link string}
   * @returns
   */
  const compositor = (color: string, overlay: string): string => {
    return composite(color, overlay);
  };

  /**
   * 颜色代码验证函数
   *
   * @param hex - hex 颜色代码 {@link string}
   * @returns  返回一个 (hex: string) => boolean 函数对象
   */
  const isHex = (hex: string): boolean => {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{8})$/.test(hex);
  };

  /**
   * 将 rgb 或 rgba 转换成不带透明度的 hex 颜色
   *
   * @param rgb - rgb 颜色代码 {@link string}
   * @returns 返回一个 (rgb: string) => string 函数对象
   */
  const rgbToHex = (rgb: string): string => {
    // 提取 RGBA 中的各个分量
    const matches = rgb.match(/(\d+(\.\d+)?)/g);

    if (!matches || (matches.length !== 3 && matches.length !== 4)) {
      throw new Error('Invalid RGB or RGBA color format');
    }

    // 将分量转换为整数
    const [red, green, blue] = matches.slice(0, 3).map(Number);
    // 将 RGB 转换为十六进制
    const rgbHex = ((red << 16) + (green << 8) + blue).toString(16).padStart(6, '0');

    // 返回结果
    return `#${rgbHex}`;
  };

  /**
   * 将 rgb 或 rgba 转换成带透明度的 hex 颜色
   *
   * @param rgba - rgba 颜色代码 {@link string}
   * @returns 返回一个 (rgba: string) => string 函数对象
   */
  const rgbaToHex = (rgba: string): string => {
    // 提取 RGBA 中的各个分量
    const matches = rgba.match(/(\d+(\.\d+)?)/g);

    if (!matches || (matches.length !== 3 && matches.length !== 4)) {
      throw new Error('Invalid RGB or RGBA color format');
    }

    // 将分量转换为整数
    const [red, green, blue] = matches.slice(0, 3).map(Number);
    // 将 RGB 转换为十六进制
    const rgbHex = ((red << 16) + (green << 8) + blue).toString(16).padStart(6, '0');
    // 处理透明度，如果存在, 将 alpha 值转换为十六进制
    const alphaHex =
      matches.length === 4
        ? Math.round(Number(matches[3]) * 255)
            .toString(16)
            .padStart(2, '0')
        : '';

    // 返回结果
    return `#${rgbHex}${alphaHex}`;
  };

  /**
   * hex to rgb
   *
   * @param hex - hex 颜色代码 {@link string}
   * @returns 返回一个  (hex: string) => Array<number> 函数对象
   */
  const hexToRgb = (hex: string): Array<number> => {
    if (isHex(hex)) {
      // 去除可能存在的 # 号
      hex = hex.replace(/^#/, '');
      // 将 Hex 转为 R, G, B 数值
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;

      return [r, g, b];
    }
    return [255, 255, 255];
  };

  /**
   * hex to rgba
   *
   * @param hex - hex 颜色代码 {@link string}
   * @param alpha - 透明度 {@link number}
   * @returns 返回一个  (hex: string, alpha?: number) => string 函数对象
   */
  const hexToRgba = (hex: string, alpha: number = 1): string => {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  /**
   * 根据背景色获取文本颜色
   *
   * @param hex - hex 颜色代码 {@link string}
   * @param light - 明亮颜色 {@link string}
   * @param dark - 暗黑颜色 {@link string}
   * @returns 返回一个  (hex: string, light?: string, dark?: string) => string 函数对象
   */
  const textColor = (hex: string, light: string = '#ffffff', dark: string = '#000000'): string => {
    const [r, g, b] = hexToRgb(hex);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? dark : light;
  };

  return { compositor, hexToRgb, hexToRgba, isHex, rgbToHex, rgbaToHex, textColor };
};
