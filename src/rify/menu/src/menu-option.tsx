import { FC, ReactNode, isValidElement } from 'react';
import { Item, MenuItemProps } from 'rc-menu';
import { Tooltip, TooltipProps } from '../../tooltip';
import MenuContext, { MenuContextProps } from './menu-context';
import { cloneElement } from '../../_utils';
import omit from 'rc-util/lib/omit';
import toArray from 'rc-util/lib/Children/toArray';
import classNames from 'classnames';

export interface MenuOptionProps extends Omit<MenuItemProps, 'title'> {
  icon?: ReactNode;
  title?: ReactNode;
}

type MenuOptionComponent = FC<MenuOptionProps>;
type RestArgs<T> = T extends (arg: any, ...args: infer P) => any ? P : never;
type GenericProps<T = unknown> = T extends infer U extends MenuOptionProps ? (unknown extends U ? MenuOptionProps : U) : MenuOptionProps;

type GenericComponent = Omit<MenuOptionComponent, ''> & {
  <T extends MenuOptionProps>(props: GenericProps<T>, ...args: RestArgs<MenuOptionComponent>): ReturnType<MenuOptionComponent>;
};

const menuOption: GenericComponent = props => {
  const { className, children, icon, title, disabled } = props;

  const { firstLevel, inlineCollapsed: isInlineCollapsed, mergedClsPrefix } = useContext<MenuContextProps>(MenuContext);

  const renderItemChildren = (inlineCollapsed: boolean) => {
    const wrapNode = <span className={`${mergedClsPrefix}-title-content`}>{children}</span>;
    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    if (!icon && children && inlineCollapsed && firstLevel && typeof children === 'string') {
      return <div className={`${mergedClsPrefix}-inline-collapsed-noicon`}>{children.charAt(0)}</div>;
    }
    return wrapNode;
  };

  let tooltipTitle = title;

  if (typeof title === 'undefined') {
    tooltipTitle = firstLevel ? children : '';
  } else if (title === false) {
    tooltipTitle = '';
  }

  const tooltipProps: TooltipProps = { title: tooltipTitle };

  if (disabled || !isInlineCollapsed) {
    tooltipProps.title = null;
    // Reset `open` to fix control mode tooltip display not correct
    tooltipProps.open = false;
  }
  const childrenLength = toArray(children).length;

  return (
    <Tooltip>
      <Item
        {...omit(props, ['title', 'icon'])}
        className={classNames(
          {
            [`${mergedClsPrefix}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1,
          },
          className,
        )}
        title={typeof title === 'string' ? title : undefined}
      >
        {cloneElement(icon, {
          className: classNames(isValidElement(icon) ? icon.props?.className : '', `${mergedClsPrefix}-item-icon`),
        })}
        {renderItemChildren(isInlineCollapsed)}
      </Item>
    </Tooltip>
  );
};

export default menuOption;
