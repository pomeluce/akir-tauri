import { commonDark } from '../../_styles/common';
import type { MenuTheme } from './light';
import { self } from './light';

const menuDark: MenuTheme = {
  name: 'Menu',
  common: commonDark,
  self(vars) {
    const commonSelf = self(vars);
    return commonSelf;
  },
};

export default menuDark;
