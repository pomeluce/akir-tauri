import { commonDark } from '../../_styles/common';
import type { TooltipTheme } from './light';
import { self } from './light';

const tooltipDark: TooltipTheme = {
  name: 'Tooltip',
  common: commonDark,
  self(vars) {
    const commonSelf = self(vars);
    commonSelf.color = '#424242';
    return commonSelf;
  },
};

export default tooltipDark;
