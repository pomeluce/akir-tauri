import { ReactNode, RefAttributes } from 'react';
import {
  MenuProps as ArcoMenuProps,
  MenuItemGroupProps as ArcoMenuItemGroupProps,
  MenuItemProps as ArcoMenuItemProps,
  MenuSubMenuProps as ArcoMenuSubMenuProps,
} from '@arco-design/web-react';

export interface MenuItemType extends Omit<ArcoMenuItemProps, 'children'> {
  icon?: ReactNode;
  label?: string;
  type?: 'item';
}

export interface SubMenuType<T extends MenuItemType = MenuItemType> extends Omit<ArcoMenuSubMenuProps, 'children'> {
  icon?: ReactNode;
  label?: string;
  children: OptionType<T>[];
  type: 'submenu';
}

export interface MenuItemGroupType<T extends ArcoMenuItemProps = ArcoMenuItemProps> extends Omit<ArcoMenuItemGroupProps, 'children'> {
  key?: string;
  label?: string;
  children?: OptionType<T>[];
  type: 'group';
}

export type OptionType<T extends MenuItemType = MenuItemType> = T | SubMenuType<T> | MenuItemGroupType<T> | null;

export interface MenuProps extends ArcoMenuProps {
  options: OptionType[];
}

const toNodes = (list: OptionType[]) => {
  return (list || [])
    .map((opt, index) => {
      if (opt && typeof opt === 'object') {
        const { children, key, label, type, icon, ...props } = opt as any;
        const mergedKey = key ?? `temp-${index}`;

        if (children || type === 'group') {
          if (type === 'group') {
            return (
              <ArcoMenu.ItemGroup key={mergedKey} {...props} title={label}>
                {toNodes(children)}
              </ArcoMenu.ItemGroup>
            );
          }

          return (
            <ArcoMenu.SubMenu
              key={mergedKey}
              title={
                icon ? (
                  <div className="flex items-center gap-2">
                    {icon}
                    <span>{label}</span>
                  </div>
                ) : (
                  label
                )
              }
              {...props}
            >
              {toNodes(children)}
            </ArcoMenu.SubMenu>
          );
        }
        return (
          <ArcoMenu.Item key={mergedKey} {...props}>
            {icon ? (
              <div className="flex items-center gap-2">
                {icon}
                <span>{label}</span>
              </div>
            ) : (
              label
            )}
          </ArcoMenu.Item>
        );
      }
      return null;
    })
    .filter(opt => opt);
};

const menu = (props: MenuProps) => {
  const { children, options, ...restProps } = props;
  return <ArcoMenu {...restProps}>{toNodes(options) || children}</ArcoMenu>;
};

export default menu;
