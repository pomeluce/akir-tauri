import { commonDark, commonLight } from '../_styles/common';
import { alertDark, alertLight, alertRtlState } from '../alert/styles';
import { buttonDark, buttonLight, buttonRtlState } from '../button/styles';
import { cardDark, cardLight, cardRtlState } from '../card/styles';
import { menuDark, menuLight, menuRtlState } from '../menu/styles';
import { messageDark, messageLight, messageRtlState } from '../message/styles';
import { resultLight, resultDark, resultRtlState } from '../result/styles';
import { spinDark, spinLight, spinRtlState } from '../spin/styles';
import { tooltipLight, tooltipDark, tooltipRtlState } from '../tooltip/styles';
import { GlobalTheme } from './interface';
import { RtlEnabledStae } from './internal-interface';

export const defaultClsPrefix = 'rify';

export const lightTheme: GlobalTheme = {
  name: 'light',
  common: commonLight,
  Alert: alertLight,
  Button: buttonLight,
  Card: cardLight,
  Menu: menuLight,
  Message: messageLight,
  Result: resultLight,
  Spin: spinLight,
  Tooltip: tooltipLight,
};

export const darkTheme: GlobalTheme = {
  name: 'dark',
  common: commonDark,
  Alert: alertDark,
  Button: buttonDark,
  Card: cardDark,
  Menu: menuDark,
  Message: messageDark,
  Result: resultDark,
  Spin: spinDark,
  Tooltip: tooltipDark,
};

export const rtlEnabledState: RtlEnabledStae = {
  Alert: alertRtlState,
  Button: buttonRtlState,
  Card: cardRtlState,
  Menu: menuRtlState,
  Message: messageRtlState,
  Result: resultRtlState,
  Spin: spinRtlState,
  Tooltip: tooltipRtlState,
};

export const globalTheme = (mode: 'light' | 'dark') => (mode === 'light' ? lightTheme : darkTheme);

export const defaultProps = { clsPrefix: defaultClsPrefix, theme: lightTheme };
