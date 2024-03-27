import type { CSSProperties, ReactNode } from 'react';
import { ErrorIcon, InfoIcon, RifyBaseClose, RifyBaseIcon, SuccessIcon, WarningIcon } from '../../_internal';
import { getMargin } from 'seemly';
import { useConfig, useRtl, useTheme } from '../../_mixins';
import { createKey } from '../../_utils';
import { alertLight } from '../styles';
import style from './styles/index.cssr';

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

const alert: React.FC<AlertProps> = props => {
  const { mergedClsPrefix, mergedRtl } = useConfig();
  const theme = useTheme('Alert', '-alert', style, alertLight, mergedClsPrefix);
  const rtlEnabled = useRtl('Card', mergedRtl, mergedClsPrefix);

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

    const { type = 'default' } = props;
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

  const classes = [
    `${mergedClsPrefix}-alert`,
    props.closable && `${mergedClsPrefix}-alert--closable`,
    props.showIcon && `${mergedClsPrefix}-alert--show-icon`,
    !props.title && props.closable && `${mergedClsPrefix}-alert--right-adjust`,
    rtlEnabled && `${mergedClsPrefix}-alert--rtl`,
    props.className || '',
  ]
    .filter(cls => cls)
    .join(' ')
    .trimEnd();

  // 组件注销执行
  useEffect(() => {
    return () => {
      handleAfterLeave();
    };
  }, [visible]);

  return (
    <>
      {visible ? (
        <div className={classes} style={cssVars() as CSSProperties} role="alert">
          {props.closable && <RifyBaseClose clsPrefix={mergedClsPrefix} className={`${mergedClsPrefix}-alert__close`} onClick={handleCloseClick} />}
          {props.bordered && <div className={`${mergedClsPrefix}-alert__border`} />}
          <div
            className={[`${mergedClsPrefix}-alert-body`, props.bordered && `${mergedClsPrefix}-alert-body--bordered`]
              .filter(cls => cls)
              .join(' ')
              .trimEnd()}
          >
            {props.showIcon && (
              <div className={`${mergedClsPrefix}-alert-body__icon`} aria-hidden="true">
                {props.icon || (
                  <RifyBaseIcon clsPrefix={mergedClsPrefix}>
                    {(() => {
                      switch (props.type) {
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
            {props.header || props.title ? <div className={`${mergedClsPrefix}-alert-body__title`}>{props.header || props.title}</div> : null}
            {props.children && <div className={`${mergedClsPrefix}-alert-body__content`}>{props.children}</div>}
          </div>
        </div>
      ) : null}
    </>
  );
};

alert.defaultProps = { showIcon: true, type: 'default', bordered: true };

if (__DEV__) alert.displayName = 'rify-alert';

export default alert;
