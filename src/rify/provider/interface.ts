import type { ThemeCommonVars } from './../_styles/common';
import { GlobalThemeWithoutCommon } from './internal-interface';
import { ExtractThemeOverrides } from '../_mixins/use-theme';

export type { ThemeCommonVars };
export interface CustomThemeCommonVars {}

export interface GlobalTheme extends GlobalThemeWithoutCommon {
  name: 'light' | 'dark';
  common?: ThemeCommonVars;
}

export type GlobalThemeOverrides = { common?: Partial<ThemeCommonVars & CustomThemeCommonVars> } & {
  [key in keyof GlobalThemeWithoutCommon]?: ExtractThemeOverrides<GlobalThemeWithoutCommon[key]>;
};
