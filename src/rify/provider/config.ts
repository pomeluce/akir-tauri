import { commonDark, commonLight } from '../_styles/common';
import { alertDark, alertLight } from '../alert/styles';
import { buttonDark, buttonLight, buttonRtlState } from '../button/styles';
import { cardDark, cardLight, cardRtlState } from '../card/styles';
import { resultLight, resultRtlState } from '../result/styles';
import { GlobalTheme } from './interface';
import { RtlEnabledStae } from './internal-interface';

export const defaultClsPrefix = 'rify';

export const lightTheme: GlobalTheme = {
  name: 'light',
  common: commonLight,
  Alert: alertLight,
  Button: buttonLight,
  Card: cardLight,
  Result: resultLight,
};

export const darkTheme: GlobalTheme = {
  name: 'dark',
  common: commonDark,
  Alert: alertDark,
  Button: buttonDark,
  Card: cardDark,
  Result: resultLight,
};

export const rtlEnabledState: RtlEnabledStae = {
  Button: buttonRtlState,
  Card: cardRtlState,
  Result: resultRtlState,
};

export const globalTheme = (mode: 'light' | 'dark') => (mode === 'light' ? lightTheme : darkTheme);

export const defaultProps = { clsPrefix: defaultClsPrefix, theme: lightTheme };
