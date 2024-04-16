import { KeyboardEvent, MouseEvent, ReactNode, isValidElement } from 'react';
import { MenuTheme } from './interface';
import MenuContext, { MenuContextProps } from './menu-context';
import { SubMenu as RcSubMenu, useFullPath } from 'rc-menu';
import { cloneElement } from '../../_utils';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

interface TitleEventEntity {
  key: string;
  domEvent: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;
}

export interface SubMenuProps {
  className?: string;
  disabled?: boolean;
  level?: number;
  title?: ReactNode;
  icon?: ReactNode;
  style?: React.CSSProperties;
  onTitleClick?: (e: TitleEventEntity) => void;
  onTitleMouseEnter?: (e: TitleEventEntity) => void;
  onTitleMouseLeave?: (e: TitleEventEntity) => void;
  popupOffset?: [number, number];
  popupClassName?: string;
  children?: React.ReactNode;
  theme?: MenuTheme;
}

const subMenu: React.FC<SubMenuProps> = props => {
  const { icon, popupClassName, title, theme: customTheme } = props;
  const context = useContext(MenuContext);
  const { mergedClsPrefix, inlineCollapsed, theme: contextTheme, cssVars } = context;

  const parentPath = useFullPath();

  let titleNode: ReactNode;

  if (!icon) {
    titleNode =
      inlineCollapsed && !parentPath.length && title && typeof title === 'string' ? (
        <div className={`${mergedClsPrefix}-inline-collapsed-noicon`}>{title.charAt(0)}</div>
      ) : (
        <span className={`${mergedClsPrefix}-title-content`}>{title}</span>
      );
  } else {
    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    const titleIsSpan = isValidElement(title) && title.type === 'span';
    titleNode = (
      <>
        {cloneElement(icon, {
          className: classNames(isValidElement(icon) ? icon.props?.className : '', `${mergedClsPrefix}-item-icon`),
        })}
        {titleIsSpan ? title : <span className={`${mergedClsPrefix}-title-content`}>{title}</span>}
      </>
    );
  }

  const contextValue = useMemo<MenuContextProps>(() => ({ ...context, firstLevel: false }), [context]);

  return (
    <MenuContext.Provider value={contextValue}>
      <RcSubMenu
        {...omit(props, ['icon'])}
        title={titleNode}
        popupClassName={classNames(mergedClsPrefix, popupClassName, `${mergedClsPrefix}-${customTheme || contextTheme}`)}
        popupStyle={cssVars}
      />
    </MenuContext.Provider>
  );
};

export default subMenu;
