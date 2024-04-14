import { ReactNode, RefAttributes } from 'react';
import { MenuTheme, OptionType } from './interface';
import { EllipsisIcon } from '../../_internal';
import RcMenu, { MenuRef as RcMenuRef, MenuProps as RcMenuProps } from 'rc-menu';
import MenuContext, { MenuContextProps } from './menu-context';
import { useConfig, useTheme } from '../../_mixins';
import { initCollapseMotion } from '../../_utils';
import { menuLight } from '../styles';
import { changeColor } from 'seemly';
import useOptions from '../hooks/useOptions';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import style from './styles/index.cssr';

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
      common: { primaryColor, cubicBezierEaseInOut, cubicBezierEaseOut },
      self: {
        borderColor,
        borderRadius,
        color,
        fontSize,
        fontSizeLarge,
        groupTitleLineHeight,
        groupTitleColor,
        lineWidth,
        lineType,
        margin,
        marginXS,
        menuActiveBarBorderWidth,
        menuActiveBarWidth,
        menuCollapsedIconSize,
        menuCollapsedWidth,
        menuIconMarginInlineEnd,
        menuBgColor,
        menuItemHeight,
        menuItemMarginBlock,
        menuItemMarginInline,
        menuItemWidth,
        motionDuration,
        motionDurationMid,
        padding,
        textColor,
        // dark theme
        darkColor,
        darkBorderColor,
        darkMenuBgColor,
        darkSelectedColor,
        darkTextColor,
      },
    } = theme;
    return {
      '--rify-bezier': cubicBezierEaseInOut,
      '--rify-bezier-x': cubicBezierEaseOut,
      '--rify-border-color': borderColor,
      '--rify-border-radius': borderRadius,
      '--rify-font-size': fontSize,
      '--rify-font-size-lg': fontSizeLarge,
      '--rify-group-line-height': groupTitleLineHeight,
      '--rify-group-title-color': groupTitleColor,
      '--rify-line-width': lineWidth,
      '--rify-line-type': lineType,
      '--rify-margin': margin,
      '--rify-margin-xs': marginXS,
      '--rify-menu-active-bar-border-width': menuActiveBarBorderWidth,
      '--rify-menu-active-bar-width': menuActiveBarWidth,
      '--rify-menu-collapsed-icon-size': menuCollapsedIconSize,
      '--rify-menu-collapsed-width': menuCollapsedWidth,
      '--rify-menu-icon-margin-inline-end': menuIconMarginInlineEnd,
      '--rify-menu-item-bg': menuBgColor,
      '--rify-menu-item-color': textColor,
      '--rify-menu-item-height': menuItemHeight,
      '--rify-menu-item-margin-block': menuItemMarginBlock,
      '--rify-menu-item-margin-inline': menuItemMarginInline,
      '--rify-menu-item-selected-color': primaryColor,
      '--rify-menu-item-selected-bg': changeColor(primaryColor, { alpha: 0.08 }),
      '--rify-menu-item-width': menuItemWidth,
      '--rify-color': color,
      '--rify-motion-duration': motionDuration,
      '--rify-motion-duration-mid': motionDurationMid,
      '--rify-padding': padding,
      '--rify-text-color': textColor,

      // dark theme
      '--rify-dark-border-color': darkBorderColor,
      '--rify-dark-color': darkColor,
      '--rify-dark-group-title-color': darkTextColor,
      '--rify-menu-dark-item-bg': darkMenuBgColor,
      '--rify-menu-dark-item-color': darkTextColor,
      '--rify-menu-dark-item-selected-bg': primaryColor,
      '--rify-menu-dark-item-selected-color': darkSelectedColor,
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
