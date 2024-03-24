import { RtlItem } from '../../provider/internal-interface';
import buttonRtl from '../src/styles/rtl.cssr';

export { default as buttonDark } from './dark';
export { default as buttonLight } from './light';
export type { ButtonThemeVars, ButtonTheme } from './light';

export const buttonRtlState: RtlItem = {
  name: 'Button',
  style: buttonRtl,
};
