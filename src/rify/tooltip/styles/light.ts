import commonVariables from './_common';
import { commonLight } from '../../_styles/common';
import type { ThemeCommonVars } from '../../_styles/common';
import type { Theme } from '../../_mixins';

export const self = (vars: ThemeCommonVars) => {
  const { baseColor, textColor1, lineHeight, fontWeightStrong, borderRadiusSmall, boxShadow1 } = vars;
  return {
    ...commonVariables,
    borderRadius: borderRadiusSmall,
    boxShadow: boxShadow1,
    color: 'rgba(0, 0, 0, 0.85)',
    lineHeight,
    titleFontWeight: fontWeightStrong,
    titleTextColor: textColor1,
    textColor: baseColor,
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
