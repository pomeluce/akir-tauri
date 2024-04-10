import { CSSProperties, ReactNode, isValidElement } from 'react';
import RcTooltip from 'rc-tooltip';
import type { TooltipProps as RcTooltipProps, TooltipRef as RcTooltipRef } from 'rc-tooltip/lib/Tooltip';
import type { placements as Placements } from 'rc-tooltip/lib/placements';
import { cloneElement, isFragment, type AdjustOverflow, type RenderFunction } from '../../_utils';
import classNames from 'classnames';
import { useMergedState } from 'rc-util';
import { useConfig, useRtl, useTheme } from '../../_mixins';
import { tooltipLight } from '../styles';
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
  rootClassName?: string;
  color?: string;
  placement?: TooltipPlacement;
  builtinPlacements?: typeof Placements;
  openClassName?: string;
  arrow?: boolean;
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

const tooltip: React.ForwardRefRenderFunction<TooltipRef, TooltipProps> = (props, ref) => {
  const {
    arrow,
    className,
    color,
    children,
    title,
    overlay,
    overlayClassName,
    overlayInnerStyle,
    overlayStyle,
    afterOpenChange,
    destroyTooltipOnHide,
    getPopupContainer,
    getTooltipContainer,
    openClassName,
    zIndex,
    placement,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    builtinPlacements,
    autoAdjustOverflow = true,
    ...attr
  } = props;

  const { mergedClsPrefix, mergedRtl } = useConfig();

  const theme = useTheme('Tooltip', '-tooltip', style, tooltipLight, mergedClsPrefix);
  const rtlEnabled = useRtl('Button', mergedRtl, mergedClsPrefix);

  const mergedShowArrow = !!arrow;

  const tooltipRef = useRef<RcTooltipRef>(null);

  const forceAlign = () => {
    tooltipRef.current?.forceAlign();
  };
  useImperativeHandle(ref, () => ({
    forceAlign,
  }));

  const [open, setOpen] = useMergedState(false, { value: props.open, defaultValue: props.defaultOpen });

  const noTitle = !title && !overlay && title !== 0;

  const onOpenChange = (vis: boolean) => {
    setOpen(noTitle ? false : vis);
    if (!noTitle) {
      props.onOpenChange?.(vis);
    }
  };

  const memoOverlay = useMemo<TooltipProps['overlay']>(() => {
    if (title === 0) {
      return title;
    }
    return overlay || title || '';
  }, [overlay, title]);

  const child = isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>;
  const childProps = child.props;
  const childCls =
    !childProps.className || typeof childProps.className === 'string' ? classNames(childProps.className, openClassName || `${mergedClsPrefix}-tooltip-open`) : childProps.className;

  const colorInfo = {
    overlayStyle: {
      background: color,
    } as CSSProperties,
    arrowStyle: {
      '--rify-tooltip-arrow-background-color': color,
    } as CSSProperties,
  };

  let tempOpen = open;
  // Hide tooltip when there is no title
  if (!('open' in props) && noTitle) {
    tempOpen = false;
  }

  const arrowContentStyle = colorInfo.arrowStyle;
  const formattedOverlayInnerStyle: React.CSSProperties = {
    ...overlayInnerStyle,
    ...colorInfo.overlayStyle,
  };

  const classes = classNames(overlayClassName, { [`${mergedClsPrefix}-tooltip--hidden`]: !tempOpen, [`${mergedClsPrefix}-tooltip--rtl`]: rtlEnabled }, className);

  return (
    <RcTooltip
      zIndex={zIndex}
      showArrow={mergedShowArrow}
      placement={placement}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      prefixCls={`${mergedClsPrefix}-tooltip`}
      overlayClassName={classes}
      overlayStyle={{ ...arrowContentStyle, ...overlayStyle }}
      getTooltipContainer={getPopupContainer || getTooltipContainer}
      ref={tooltipRef}
      builtinPlacements={builtinPlacements}
      overlay={typeof memoOverlay === 'function' ? memoOverlay() : memoOverlay}
      visible={tempOpen}
      onVisibleChange={onOpenChange}
      afterVisibleChange={afterOpenChange}
      overlayInnerStyle={formattedOverlayInnerStyle}
      arrowContent={<span className={`${mergedClsPrefix}-arrow-content`} />}
      destroyTooltipOnHide={!!destroyTooltipOnHide}
      {...attr}
    >
      {tempOpen ? cloneElement(child, { className: childCls }) : child}
    </RcTooltip>
  );
};

if (__DEV__) tooltip.displayName = 'rify-tooltip';

export default forwardRef(tooltip);
