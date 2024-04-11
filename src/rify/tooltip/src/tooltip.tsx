import { CSSProperties, ReactNode, RefAttributes, isValidElement } from 'react';
import RcTooltip from 'rc-tooltip';
import type { BuildInPlacements } from '@rc-component/trigger';
import type { TooltipProps as RcTooltipProps, TooltipRef as RcTooltipRef } from 'rc-tooltip/lib/Tooltip';
import type { placements as Placements } from 'rc-tooltip/lib/placements';
import type { AdjustOverflow, RenderFunction } from '../../_utils';
import { cloneElement, getPlacements, isFragment } from '../../_utils';
import { useConfig, useRtl, useTheme } from '../../_mixins';
import { tooltipLight } from '../styles';
import { useMergedState } from 'rc-util';
import classNames from 'classnames';
import style from './styles/index.cssr';

export interface TooltipRef {
  forceAlign: VoidFunction;
}

export type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export interface TooltipAlignConfig {
  points?: [string, string];
  offset?: [number | string, number | string];
  targetOffset?: [number | string, number | string];
  overflow?: { adjustX: boolean; adjustY: boolean };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}

interface LegacyTooltipProps extends Partial<Omit<RcTooltipProps, 'children' | 'visible' | 'defaultVisible' | 'onVisibleChange' | 'afterVisibleChange' | 'destroyTooltipOnHide'>> {
  open?: RcTooltipProps['visible'];
  defaultOpen?: RcTooltipProps['defaultVisible'];
  onOpenChange?: RcTooltipProps['onVisibleChange'];
  afterOpenChange?: RcTooltipProps['afterVisibleChange'];
}

export interface AbstractTooltipProps extends LegacyTooltipProps {
  style?: React.CSSProperties;
  className?: string;
  color?: string;
  placement?: TooltipPlacement;
  builtinPlacements?: typeof Placements;
  openClassName?: string;
  arrow?: boolean | { pointAtCenter?: boolean };
  autoAdjustOverflow?: boolean | AdjustOverflow;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  children?: ReactNode;
  destroyTooltipOnHide?: boolean | { keepParent?: boolean };
}

export interface TooltipPropsWithOverlay extends AbstractTooltipProps {
  title?: ReactNode | RenderFunction;
  overlay?: ReactNode | RenderFunction;
}

export interface TooltipPropsWithTitle extends AbstractTooltipProps {
  title: ReactNode | RenderFunction;
  overlay?: ReactNode | RenderFunction;
}

export declare type TooltipProps = TooltipPropsWithTitle | TooltipPropsWithOverlay;

const tooltip: React.ForwardRefExoticComponent<TooltipProps & RefAttributes<TooltipRef>> = forwardRef<TooltipRef, TooltipProps>((props, ref) => {
  const {
    arrow = true,
    afterOpenChange: afterVisibleChange,
    autoAdjustOverflow = true,
    builtinPlacements,
    className,
    color,
    children,
    defaultOpen,
    destroyTooltipOnHide,
    getPopupContainer,
    getTooltipContainer,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    onOpenChange,
    open,
    openClassName,
    overlay,
    overlayClassName,
    overlayInnerStyle,
    overlayStyle,
    placement = 'top',
    title,
    ...attr
  } = props;

  const { mergedClsPrefix, mergedRtl } = useConfig();

  const theme = useTheme('Tooltip', '-tooltip', style, tooltipLight, mergedClsPrefix);
  const { common, self } = theme;
  const rtlEnabled = useRtl('Button', mergedRtl, mergedClsPrefix);

  const mergedShowArrow = !!arrow;

  const tooltipRef = useRef<RcTooltipRef>(null);

  const forceAlign = () => {
    tooltipRef.current?.forceAlign();
  };
  useImperativeHandle(ref, () => ({
    forceAlign,
  }));

  const [visible, setVisible] = useMergedState(false, { value: open, defaultValue: defaultOpen });

  const noTitle = !title && !overlay && title !== 0;

  const handleVisibleChange = (vis: boolean) => {
    setVisible(noTitle ? false : vis);
    if (!noTitle) {
      onOpenChange?.(vis);
    }
  };

  const tooltipPlacements = useMemo<BuildInPlacements>(() => {
    const mergedArrowPointAtCenter = typeof arrow === 'object' ? arrow.pointAtCenter : false;
    return (
      builtinPlacements ||
      getPlacements({
        arrowPointAtCenter: mergedArrowPointAtCenter,
        autoAdjustOverflow,
        arrowWidth: mergedShowArrow ? 16 : 0,
        borderRadius: 6,
        offset: 4,
        visibleFirst: true,
      })
    );
  }, [arrow, builtinPlacements]);

  const memoOverlay = useMemo<TooltipProps['overlay']>(() => {
    if (title === 0) {
      return title;
    }
    return overlay || title || '';
  }, [overlay, title]);

  const child = isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>;
  const childProps = child.props;
  const childClassName =
    !childProps.className || typeof childProps.className === 'string' ? classNames(childProps.className, openClassName || `${mergedClsPrefix}-tooltip-open`) : childProps.className;

  const colorInfo = {
    overlayStyle: {
      background: color,
    } as CSSProperties,
    arrowStyle: {
      '--rify-tooltip-arrow-background-color': color,
    } as CSSProperties,
  };

  // Hide tooltip when there is no title
  const mergedVisible = !('open' in props) && noTitle ? false : visible;

  const arrowContentStyle = colorInfo.arrowStyle;
  const formattedOverlayInnerStyle: React.CSSProperties = {
    ...overlayInnerStyle,
    ...colorInfo.overlayStyle,
  };

  const classes = classNames(overlayClassName, { [`${mergedClsPrefix}-tooltip--hidden`]: !mergedVisible, [`${mergedClsPrefix}-tooltip--rtl`]: rtlEnabled }, className);

  return (
    <RcTooltip
      ref={tooltipRef}
      afterVisibleChange={afterVisibleChange}
      arrowContent={<span className={`${mergedClsPrefix}-arrow-content`} />}
      builtinPlacements={tooltipPlacements}
      destroyTooltipOnHide={!!destroyTooltipOnHide}
      getTooltipContainer={getPopupContainer || getTooltipContainer}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      onVisibleChange={handleVisibleChange}
      overlay={typeof memoOverlay === 'function' ? memoOverlay() : memoOverlay}
      overlayClassName={classes}
      overlayInnerStyle={formattedOverlayInnerStyle}
      overlayStyle={{ ...arrowContentStyle, ...overlayStyle }}
      placement={placement}
      prefixCls={`${mergedClsPrefix}-tooltip`}
      showArrow={mergedShowArrow}
      visible={mergedVisible}
      {...attr}
    >
      {mergedVisible ? cloneElement(child, { className: childClassName }) : child}
    </RcTooltip>
  );
});

if (__DEV__) tooltip.displayName = 'rify-tooltip';

tooltip.defaultProps = { arrow: true, autoAdjustOverflow: true };

export default tooltip;
