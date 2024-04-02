import { HTMLAttributes, ReactNode } from 'react';

export type Key = string | number;

export interface MenuOptionSharedPart {
  key?: Key;
  disabled?: boolean;
  icon?: () => ReactNode;
  children?: Array<MenuOption | MenuGroupOption | MenuDividerOption>;
  extra?: string | (() => ReactNode);
  props?: HTMLAttributes<HTMLElement>;
  show?: boolean;
  [key: string]: unknown;
}

/**
 * @private
 */
export type MenuIgnoredOption = MenuDividerOption | MenuRenderOption;

export interface MenuDividerOption {
  type: 'divider';
  key?: Key;
  props?: HTMLAttributes<HTMLElement>;
  [key: string]: unknown;
}

export interface MenuRenderOption {
  type: 'render';
  key?: Key;
  props?: HTMLAttributes<HTMLElement>;
  render?: () => ReactNode;
  [key: string]: unknown;
}
export interface MenuGroupOptionBase extends MenuOptionSharedPart {
  type: 'group';
  children: Array<MenuOption | MenuDividerOption>;
}

export type MenuGroupOption = MenuGroupOptionBase | (MenuGroupOptionBase & { label?: string | (() => ReactNode) });

export type MenuMixedOption = MenuDividerOption | MenuOption | MenuGroupOption;

export type MenuOption = MenuOptionSharedPart | (MenuOptionSharedPart & { label?: string | (() => ReactNode) });

export type OnUpdateValue = (value: string & number & (string | number), item: MenuOption) => void;

export type OnUpdateKeys = (keys: string[] & number[] & Array<string | number>) => void;

export type MenuNodeProps = (option: MenuOption | MenuGroupOption) => HTMLAttributes<HTMLElement> & Record<string, string | number | undefined>;
