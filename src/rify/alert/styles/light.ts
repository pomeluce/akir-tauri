import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles';
import { changeColor, composite } from 'seemly';
import { commonLight } from '../../_styles';
import commonVars from './_common';

const self = (vars: ThemeCommonVars) => {
  const {
    lineHeight,
    borderRadius,
    fontWeightStrong,
    baseColor,
    dividerColor,
    actionColor,
    textColor1,
    textColor2,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    infoColor,
    successColor,
    warningColor,
    errorColor,
    fontSize,
  } = vars;
  return {
    ...commonVars,
    fontSize,
    lineHeight,
    titleFontWeight: fontWeightStrong,
    borderRadius,
    border: `1px solid ${dividerColor}`,
    color: actionColor,
    titleTextColor: textColor1,
    iconColor: textColor2,
    contentTextColor: textColor2,
    closeBorderRadius: borderRadius,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    borderInfo: `1px solid ${composite(baseColor, changeColor(infoColor, { alpha: 0.25 }))}`,
    colorInfo: composite(baseColor, changeColor(infoColor, { alpha: 0.08 })),
    titleTextColorInfo: composite(baseColor, changeColor(infoColor, { alpha: 0.9 })),
    iconColorInfo: infoColor,
    contentTextColorInfo: composite(baseColor, changeColor(infoColor, { alpha: 0.9 })),
    closeColorHoverInfo: closeColorHover,
    closeColorPressedInfo: closeColorPressed,
    closeIconColorInfo: closeIconColor,
    closeIconColorHoverInfo: closeIconColorHover,
    closeIconColorPressedInfo: closeIconColorPressed,
    borderSuccess: `1px solid ${composite(baseColor, changeColor(successColor, { alpha: 0.25 }))}`,
    colorSuccess: composite(baseColor, changeColor(successColor, { alpha: 0.08 })),
    titleTextColorSuccess: composite(baseColor, changeColor(successColor, { alpha: 0.9 })),
    iconColorSuccess: successColor,
    contentTextColorSuccess: composite(baseColor, changeColor(successColor, { alpha: 0.9 })),
    closeColorHoverSuccess: closeColorHover,
    closeColorPressedSuccess: closeColorPressed,
    closeIconColorSuccess: closeIconColor,
    closeIconColorHoverSuccess: closeIconColorHover,
    closeIconColorPressedSuccess: closeIconColorPressed,
    borderWarning: `1px solid ${composite(baseColor, changeColor(warningColor, { alpha: 0.33 }))}`,
    colorWarning: composite(baseColor, changeColor(warningColor, { alpha: 0.08 })),
    titleTextColorWarning: composite(baseColor, changeColor(warningColor, { alpha: 0.9 })),
    iconColorWarning: warningColor,
    contentTextColorWarning: composite(baseColor, changeColor(warningColor, { alpha: 0.9 })),
    closeColorHoverWarning: closeColorHover,
    closeColorPressedWarning: closeColorPressed,
    closeIconColorWarning: closeIconColor,
    closeIconColorHoverWarning: closeIconColorHover,
    closeIconColorPressedWarning: closeIconColorPressed,
    borderError: `1px solid ${composite(baseColor, changeColor(errorColor, { alpha: 0.25 }))}`,
    colorError: composite(baseColor, changeColor(errorColor, { alpha: 0.08 })),
    titleTextColorError: composite(baseColor, changeColor(errorColor, { alpha: 0.9 })),
    iconColorError: errorColor,
    contentTextColorError: composite(baseColor, changeColor(errorColor, { alpha: 0.9 })),
    closeColorHoverError: closeColorHover,
    closeColorPressedError: closeColorPressed,
    closeIconColorError: closeIconColor,
    closeIconColorHoverError: closeIconColorHover,
    closeIconColorPressedError: closeIconColorPressed,
  };
};

export type AlertThemeVars = ReturnType<typeof self>;

const alertLight: Theme<'Alert', AlertThemeVars> = {
  name: 'Alert',
  common: commonLight,
  self,
};

export default alertLight;
export type AlertTheme = typeof alertLight;
