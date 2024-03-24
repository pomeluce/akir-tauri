import { RtlItem } from '../../provider/internal-interface';
import resultRtl from '../src/styles/rtl.cssr';

export { default as resultDark } from './dark';
export { default as resultLight } from './light';
export type { ResultTheme, ResultThemeVars } from './light';

export const resultRtlState: RtlItem = {
  name: 'Result',
  style: resultRtl,
};
