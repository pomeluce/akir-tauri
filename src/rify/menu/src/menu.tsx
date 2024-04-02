import { ReactNode } from 'react';
import { Key } from 'treemate';
import { MaybeArray } from '../../_utils';
import { useConfig, useTheme } from '../../_mixins';
import { MenuGroupOption, MenuMixedOption, MenuNodeProps, MenuOption, OnUpdateKeys, OnUpdateValue } from './interface';
import { menuLight } from '../styles';
import style from './styles/index.cssr';

export interface MenuProps {
  options?: MenuMixedOption[];
  collapsed?: boolean;
  collapsedWith?: number;
  iconSize?: number;
  collapsedIconSize?: number;
  rootIndent?: number;
  indent?: number;
  labelField?: string;
  keyField?: string;
  childrenField?: string;
  disabledField?: string;
  defaultExpandAll?: boolean;
  defaultExpandedKeys?: Key[];
  expandedKeys?: Key[];
  value?: Key;
  defaultValue?: Key;
  mode?: 'vertial' | 'horizontal';
  watchProps: Array<'defaultExpandedKeys' | 'defaultValue'>;
  disabled?: boolean;
  show?: boolean;
  inverted: boolean;
  'onUpdate:expandedKeys'?: MaybeArray<OnUpdateKeys>;
  onUpdateExpandedKeys?: MaybeArray<OnUpdateKeys>;
  onUpdateValue: MaybeArray<OnUpdateValue>;
  'onUpdate:value': MaybeArray<OnUpdateValue>;
  expandIcon?: (option: MenuOption) => ReactNode;
  renderIcon?: (option: MenuOption) => ReactNode;
  renderLabel?: (option: MenuOption | MenuGroupOption) => ReactNode;
  renderExtra?: (option: MenuOption | MenuGroupOption) => ReactNode;
  dropdownProps?: DropdownProps;
  accordion: boolean;
  nodeProps: MenuNodeProps;
  dropdownPlacement: FollowerPlacement;
  responsive: boolean;
  onOpenNamesChange: MaybeArray<OnUpdateKeys>;
  onSelect: MaybeArray<OnUpdateValue>;
  onExpandedNamesChange: MaybeArray<OnUpdateKeys>;
  expandedNames: Key[];
  defaultExpandedNames: Key[];
}

const menu: React.FC<{}> = () => {
  const { mergedClsPrefix } = useConfig();
  const theme = useTheme('Menu', '-menu', style, menuLight, mergedClsPrefix);
  return <div></div>;
};

export default menu;
