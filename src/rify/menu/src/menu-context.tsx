import { createContext } from 'react';
import { MenuTheme } from './interface';

export interface MenuContextProps {
  mergedClsPrefix: string;
  firstLevel: boolean;
  inlineCollapsed: boolean;
  theme?: MenuTheme;
}

const MenuContext = createContext<MenuContextProps>({
  mergedClsPrefix: '',
  firstLevel: true,
  inlineCollapsed: false,
});

export default MenuContext;
