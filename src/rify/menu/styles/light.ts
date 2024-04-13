import commonVariables from './_common';
import { commonLight } from '../../_styles/common';
import type { ThemeCommonVars } from '../../_styles/common';
import type { Theme } from '../../_mixins';

export const self = (vars: ThemeCommonVars) => {
  const { borderRadius, dividerColor, menuColor, textColor2, fontSize } = vars;
  return {
    ...commonVariables,
    borderRadius,
    borderColor: dividerColor,
    color: menuColor,
    fontSize,
    textColor: textColor2,
  };
};

export type MenuThemeVars = ReturnType<typeof self>;

const menuLight: Theme<'Menu', MenuThemeVars> = {
  name: 'Menu',
  common: commonLight,
  self,
};

export default menuLight;
export type MenuTheme = typeof menuLight;
