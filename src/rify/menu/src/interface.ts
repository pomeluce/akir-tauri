import { ReactNode } from 'react';
import { MenuItemType, SubMenuType as RcSubMenuType, MenuItemGroupType, MenuDividerType as RcMenuDividerType } from 'rc-menu/lib/interface';
export type MenuTheme = 'light' | 'dark';

export interface MenuOptionType extends MenuItemType {
  icon?: ReactNode;
  title?: string;
}

export interface SubMenuType<T extends MenuOptionType = MenuOptionType> extends Omit<RcSubMenuType, 'children'> {
  icon?: React.ReactNode;
  theme?: 'dark' | 'light';
  children: OptionType<T>[];
}

export interface MenuOptionGroupType<T extends MenuItemType = MenuItemType> extends Omit<MenuItemGroupType, 'children'> {
  children?: OptionType<T>[];
  key?: React.Key;
}

export interface MenuDividerType extends RcMenuDividerType {
  dashed?: boolean;
  key?: React.Key;
}

export type OptionType<T extends MenuItemType = MenuItemType> = T | SubMenuType<T> | MenuOptionGroupType<T> | MenuDividerType | null;
