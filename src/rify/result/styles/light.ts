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

export type ResultThemeVars = ReturnType<typeof self>;

const resultLight: Theme<'Result', ResultThemeVars> = {
  name: 'Result',
  common: commonLight,
  self,
};

export default resultLight;
export type ResultTheme = typeof resultLight;
