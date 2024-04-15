import { createContext } from 'react';
import { MenuTheme } from './interface';

export interface MenuContextProps {
  mergedClsPrefix: string;
  firstLevel: boolean;
  direction?: 'ltr' | 'rtl' | undefined;
  inlineCollapsed: boolean;
  theme?: MenuTheme;
}

const MenuContext = createContext<MenuContextProps>({
  mergedClsPrefix: '',
  firstLevel: true,
  inlineCollapsed: false,
});

export default MenuContext;
