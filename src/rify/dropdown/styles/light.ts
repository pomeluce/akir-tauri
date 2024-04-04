import { changeColor } from 'seemly';
import { commonLight, ThemeCommonVars } from '../../_styles';
import { createTheme, Theme } from '../../_mixins';
import commonVariables from './_common';
import { popoverLight } from '../../popover/styles';

export const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    textColor2,
    dividerColor,
    hoverColor,
    popoverColor,
    invertedColor,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    textColor3,
    opacityDisabled,
  } = vars;
  return {
    ...commonVariables,
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightHuge: heightHuge,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    // non-inverted
    optionTextColor: textColor2,
    optionTextColorHover: textColor2,
    optionTextColorActive: primaryColor,
    optionTextColorChildActive: primaryColor,
    color: popoverColor,
    dividerColor,
    suffixColor: textColor2,
    prefixColor: textColor2,
    optionColorHover: hoverColor,
    optionColorActive: changeColor(primaryColor, { alpha: 0.1 }),
    groupHeaderTextColor: textColor3,
    // inverted
    optionTextColorInverted: '#BBB',
    optionTextColorHoverInverted: '#FFF',
    optionTextColorActiveInverted: '#FFF',
    optionTextColorChildActiveInverted: '#FFF',
    colorInverted: invertedColor,
    dividerColorInverted: '#BBB',
    suffixColorInverted: '#BBB',
    prefixColorInverted: '#BBB',
    optionColorHoverInverted: primaryColor,
    optionColorActiveInverted: primaryColor,
    groupHeaderTextColorInverted: '#AAA',
    optionOpacityDisabled: opacityDisabled,
  };
};

export type DropdownThemeVars = ReturnType<typeof self>;

const dropdownLight: Theme<'Dropdown', DropdownThemeVars> = {
  name: 'Dropdown',
  common: commonLight,
  peers: {
    Popover: popoverLight,
  },
  self,
};

export type DropdownTheme = typeof dropdownLight;
export default dropdownLight;
