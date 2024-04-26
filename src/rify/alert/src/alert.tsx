import type { CSSProperties, ReactNode, RefAttributes } from 'react';
import { ErrorIcon, InfoIcon, RifyBaseClose, RifyBaseIcon, SuccessIcon, WarningIcon } from '../../_internal';
import { getMargin } from 'seemly';
import { useConfig, useRtl, useTheme } from '../../_mixins';
import { createKey } from '../../_utils';
import { alertLight } from '../styles';
import style from './styles/index.cssr';
import classNames from 'classnames';

export interface AlertProps {
  className?: string;
  title?: string;
  showIcon?: boolean;
  type?: 'info' | 'warning' | 'error' | 'success' | 'default';
  bordered?: boolean;
  closable?: boolean;
  icon?: ReactNode;
  header?: ReactNode;
  children?: ReactNode;
  onClose?: Function;
  onAfterLeave?: Function;
}

const alert: React.ForwardRefExoticComponent<AlertProps & RefAttributes<HTMLDivElement>> = forwardRef((props, ref) => {
  const { mergedClsPrefix, mergedRtl } = useConfig();
  const theme = useTheme('Alert', '-alert', style, alertLight, mergedClsPrefix);
  const rtlEnabled = useRtl('Alert', mergedRtl, mergedClsPrefix);
  const { bordered = true, className, closable, children, header, icon, showIcon = true, title, type = 'default' } = props;

  const cssVars = () => {
    const {
      common: { cubicBezierEaseInOut },
      self,
    } = theme;

    const {
      fontSize,
      borderRadius,
      titleFontWeight,
      lineHeight,
      iconSize,
      iconMargin,
      iconMarginRtl,
      closeIconSize,
      closeBorderRadius,
      closeSize,
      closeMargin,
      closeMarginRtl,
      padding,
    } = self;

    const { left, right } = getMargin(iconMargin);

    return {
      '--rify-bezier': cubicBezierEaseInOut,
      '--rify-color': self[createKey('color', type)],
      '--rify-close-icon-size': closeIconSize,
      '--rify-close-border-radius': closeBorderRadius,
      '--rify-close-color-hover': self[createKey('closeColorHover', type)],
      '--rify-close-color-pressed': self[createKey('closeColorPressed', type)],
      '--rify-close-icon-color': self[createKey('closeIconColor', type)],
      '--rify-close-icon-color-hover': self[createKey('closeIconColorHover', type)],
      '--rify-close-icon-color-pressed': self[createKey('closeIconColorPressed', type)],
      '--rify-icon-color': self[createKey('iconColor', type)],
      '--rify-border': self[createKey('border', type)],
      '--rify-title-text-color': self[createKey('titleTextColor', type)],
      '--rify-content-text-color': self[createKey('contentTextColor', type)],
      '--rify-line-height': lineHeight,
      '--rify-border-radius': borderRadius,
      '--rify-font-size': fontSize,
      '--rify-title-font-weight': titleFontWeight,
      '--rify-icon-size': iconSize,
      '--rify-icon-margin': iconMargin,
      '--rify-icon-margin-rtl': iconMarginRtl,
      '--rify-close-size': closeSize,
      '--rify-close-margin': closeMargin,
      '--rify-close-margin-rtl': closeMarginRtl,
      '--rify-padding': padding,
      '--rify-icon-margin-left': left,
      '--rify-icon-margin-right': right,
    };
  };

  const [visible, setVisible] = useState(true);

  const handleCloseClick = (): void => {
    void Promise.resolve(props.onClose?.()).then(result => {
      if (result === false) return;
      setVisible(false);
    });
  };

  const handleAfterLeave = (): void => {
    props.onAfterLeave?.();
  };

  const classes = classNames(
    `${mergedClsPrefix}-alert`,
    {
      [`${mergedClsPrefix}-alert--closable`]: closable,
      [`${mergedClsPrefix}-alert--show-icon`]: showIcon,
      [`${mergedClsPrefix}-alert--right-adjust`]: !title && closable,
      [`${mergedClsPrefix}-alert--rtl`]: rtlEnabled,
    },
    className,
  );

  // 组件注销执行
  useEffect(() => {
    return () => {
      handleAfterLeave();
    };
  }, [visible]);

  return (
    <>
      {visible ? (
        <div ref={ref} className={classes} style={cssVars() as CSSProperties} role="alert">
          {closable && <RifyBaseClose clsPrefix={mergedClsPrefix} className={`${mergedClsPrefix}-alert__close`} onClick={handleCloseClick} />}
          {bordered && <div className={`${mergedClsPrefix}-alert__border`} />}
          {showIcon && (
            <div className={`${mergedClsPrefix}-alert__icon`} aria-hidden="true">
              {icon || (
                <RifyBaseIcon clsPrefix={mergedClsPrefix}>
                  {(() => {
                    switch (type) {
                      case 'success':
                        return SuccessIcon;
                      case 'info':
                        return InfoIcon;
                      case 'warning':
                        return WarningIcon;
                      case 'error':
                        return ErrorIcon;
                      default:
                        return null;
                    }
                  })()?.({})}
                </RifyBaseIcon>
              )}
            </div>
          )}
          <div className={classNames(`${mergedClsPrefix}-alert-body`, props.bordered && `${mergedClsPrefix}-alert-body--bordered`)}>
            {header || title ? <div className={`${mergedClsPrefix}-alert-body__title`}>{header || title}</div> : null}
            {children && <div className={`${mergedClsPrefix}-alert-body__content`}>{children}</div>}
          </div>
        </div>
      ) : null}
    </>
  );
});

if (__DEV__) alert.displayName = 'rify-alert';

export default alert;
