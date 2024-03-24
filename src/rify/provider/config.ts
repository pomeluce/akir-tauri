import { commonDark, commonLight } from '../_styles/common';
import { buttonDark, buttonLight, buttonRtlState } from '../button/styles';
import { cardDark, cardLight, cardRtlState } from '../card/styles';
import { GlobalTheme } from './interface';
import { RtlEnabledStae } from './internal-interface';

export const defaultClsPrefix = 'rify';

export const lightTheme: GlobalTheme = {
  name: 'light',
  common: commonLight,
  Button: buttonLight,
  Card: cardLight,
};

export const darkTheme: GlobalTheme = {
  name: 'dark',
  common: commonDark,
  Button: buttonDark,
  Card: cardDark,
};

export const rtlEnabledState: RtlEnabledStae = {
  Button: buttonRtlState,
  Card: cardRtlState,
};

export const globalTheme = (mode: 'light' | 'dark') => (mode === 'light' ? lightTheme : darkTheme);

export const defaultProps = { clsPrefix: defaultClsPrefix, theme: lightTheme };
