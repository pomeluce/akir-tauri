import { commonDark, commonLight } from '../_styles/common';
import { alertDark, alertLight, alertRtlState } from '../alert/styles';
import { buttonDark, buttonLight, buttonRtlState } from '../button/styles';
import { cardDark, cardLight, cardRtlState } from '../card/styles';
import { resultLight, resultDark, resultRtlState } from '../result/styles';
import { tooltipLight, tooltipDark } from '../tooltip/styles';
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
  Tooltip: tooltipLight,
};

export const darkTheme: GlobalTheme = {
  name: 'dark',
  common: commonDark,
  Alert: alertDark,
  Button: buttonDark,
  Card: cardDark,
  Result: resultDark,
  Tooltip: tooltipDark,
};

export const rtlEnabledState: RtlEnabledStae = {
  Alert: alertRtlState,
  Button: buttonRtlState,
  Card: cardRtlState,
  Result: resultRtlState,
};

export const globalTheme = (mode: 'light' | 'dark') => (mode === 'light' ? lightTheme : darkTheme);

export const defaultProps = { clsPrefix: defaultClsPrefix, theme: lightTheme };
