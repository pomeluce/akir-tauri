import { commonDark } from '../../_styles/common';
import type { MenuTheme } from './light';
import { self } from './light';

const menuDark: MenuTheme = {
  name: 'Menu',
  common: commonDark,
  self(vars) {
    const commonSelf = self(vars);
    commonSelf.groupTitleColor = 'rgba(255, 255, 255, 0.55)';
    return commonSelf;
  },
};

export default menuDark;
