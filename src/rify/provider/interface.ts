import { ReactNode } from 'react';
import type { ThemeCommonVars } from './../_styles/common';
import { GlobalThemeWithoutCommon } from './internal-interface';

export type { ThemeCommonVars };
export interface CustomThemeCommonVars {}

export interface ConfigProviderProps {
  theme: GlobalTheme;
  themeOverrides?: GlobalThemeOverrides;
  children?: ReactNode;
}

export type GlobalTheme = {
  name: 'light' | 'dark';
  common?: ThemeCommonVars;
};

export type GlobalThemeOverrides = {
  common?: Partial<ThemeCommonVars & CustomThemeCommonVars>;
} & {
  [key in keyof GlobalThemeWithoutCommon]?: ExtractThemeOverrides<GlobalThemeWithoutCommon[key]>;
};
