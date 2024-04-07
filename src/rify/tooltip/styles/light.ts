import commonVariables from './_common';
import { commonLight } from '../../_styles/common';
import type { ThemeCommonVars } from '../../_styles/common';
import type { Theme } from '../../_mixins';

export const self = (vars: ThemeCommonVars) => {
  const { textColor2, textColor1, lineHeight, fontWeightStrong } = vars;
  return {
    ...commonVariables,
    lineHeight,
    titleFontWeight: fontWeightStrong,
    titleTextColor: textColor1,
    textColor: textColor2,
  };
};

export type TooltipThemeVars = ReturnType<typeof self>;

const tooltipLight: Theme<'Tooltip', TooltipThemeVars> = {
  name: 'Tooltip',
  common: commonLight,
  self,
};

export default tooltipLight;
export type TooltipTheme = typeof tooltipLight;
