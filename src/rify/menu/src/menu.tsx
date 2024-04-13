import { ReactNode, RefAttributes } from 'react';
import { MenuTheme, OptionType } from './interface';
import { EllipsisIcon } from '../../_internal';
import RcMenu, { MenuRef as RcMenuRef, MenuProps as RcMenuProps } from 'rc-menu';
import MenuContext, { MenuContextProps } from './menu-context';
import { useConfig, useTheme } from '../../_mixins';
import { initCollapseMotion } from '../../_utils';
import useOptions from '../hooks/useOptions';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import style from './styles/index.cssr';
import { menuLight } from '../styles';

export interface MenuProps extends Omit<RcMenuProps, 'items'> {
  theme?: MenuTheme;
  inlineIndent?: number;
  defaultExpandedKeys?: string[];
  options?: OptionType[];
  children?: ReactNode;
}

const menu: React.ForwardRefExoticComponent<MenuProps & { collapsedWidth?: string | number } & RefAttributes<RcMenuRef>> = forwardRef((props, ref) => {
  const {
    children,
    className,
    expandIcon,
    inlineCollapsed,
    mode,
    theme: menuTheme = 'light',
    options,
    overflowedIndicatorPopupClassName,
    style: overrideStyle,
    ...restProps
  } = props;
  const passedProps = omit(restProps, ['collapsedWidth']);

  const mergedChildren = useOptions(options) || children;
  const { mergedClsPrefix, mergedRtl } = useConfig();
  const theme = useTheme('Menu', '-menu', style, menuLight, mergedClsPrefix);

  const cssVars = () => {
    const {
      common: { cubicBezierEaseInOut },
      self: { borderColor, borderRadius, color, fontSize, lineType, menuActiveBarBorderWidth, motionDuration, textColor },
    } = theme;
    return {
      // '--rify-arrow-clip-path': arrowPath,
      // '--rify-arrow-offset-horizontal': arrowOffsetHorizontal,
      // '--rify-arrow-offset-vertical': arrowOffsetVertical,
      // '--rify-arrow-shadow-width': arrowShadowWidth,
      '--rify-bezier': cubicBezierEaseInOut,
      '--rify-border-color': borderColor,
      '--rify-border-radius': borderRadius,
      '--rify-font-size': fontSize,
      '--rify-line-type': lineType,
      '--rify-menu-active-bar-border-width': menuActiveBarBorderWidth,
      '--rify-menu-item-color': textColor,
      '--rify-color': color,
      '--rify-motion-duration': motionDuration,
      // '--rify-border-radius': borderRadius,
      // '--rify-box-shadow': boxShadow,
      // '--rify-height': height,
      // '--rify-padding-sm': paddingSM,
      // '--rify-padding-xs': paddingXS,
      // '--rify-size-popup-arrow': arrowPopupSize,
      '--rify-text-color': textColor,
      ...overrideStyle,
    };
  };

  // Inline Collapsed
  const mergedInlineCollapsed = useMemo(() => {
    return inlineCollapsed;
  }, [inlineCollapsed]);

  const defaultMotions: MenuProps['defaultMotions'] = {
    horizontal: { motionName: `${mergedClsPrefix}-slide-up` },
    inline: initCollapseMotion(mergedClsPrefix),
    other: { motionName: `${mergedClsPrefix}-zoom-big` },
  };

  const menuClassName = classNames(`${mergedClsPrefix}-menu-${menuTheme}`, className);

  const contextValue = useMemo<MenuContextProps>(
    () => ({
      mergedClsPrefix: `${mergedClsPrefix}-menu`,
      inlineCollapsed: mergedInlineCollapsed || false,
      firstLevel: true,
      theme: menuTheme,
      mode,
    }),
    [mergedClsPrefix, mergedInlineCollapsed, menuTheme],
  );

  return (
    <MenuContext.Provider value={contextValue}>
      <RcMenu
        ref={ref}
        className={menuClassName}
        defaultMotions={defaultMotions}
        direction={typeof mergedRtl === 'object' ? 'ltr' : mergedRtl}
        inlineCollapsed={mergedInlineCollapsed}
        mode={mode}
        overflowedIndicator={EllipsisIcon({})}
        overflowedIndicatorPopupClassName={classNames(mergedClsPrefix, `${mergedClsPrefix}-menu-${menuTheme}`, overflowedIndicatorPopupClassName)}
        prefixCls={`${mergedClsPrefix}-menu`}
        style={cssVars()}
        {...passedProps}
      >
        {mergedChildren}
      </RcMenu>
    </MenuContext.Provider>
  );
});

if (__DEV__) menu.displayName = 'rify-menu';

menu.defaultProps = { mode: 'inline' };

export default menu;
