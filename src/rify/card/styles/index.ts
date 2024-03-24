import { RtlItem } from '../../provider/internal-interface';
import cardRtl from '../src/styles/rtl.cssr';

export { default as cardDark } from './dark';
export { default as cardLight } from './light';
export type { CardTheme, CardThemeVars } from './light';

export const cardRtlState: RtlItem = {
  name: 'Card',
  style: cardRtl,
};
