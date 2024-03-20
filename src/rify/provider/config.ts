import { ConfigProviderProps } from './config-provider';
import { commonDark, commonLight } from '../_styles/common';
import { buttonDark, buttonLight } from '../button/styles';
import { GlobalTheme } from './interface';

const light: GlobalTheme = {
  name: 'light',
  common: commonLight,
  Button: buttonLight,
};

const dark: GlobalTheme = {
  name: 'dark',
  common: commonDark,
  Button: buttonDark,
};

export const globalTheme = (mode: 'light' | 'dark') => (mode === 'light' ? light : dark);

export default {
  clsPrefix: 'rify',
  theme: light,
} as ConfigProviderProps;
