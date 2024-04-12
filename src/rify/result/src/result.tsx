import { CSSProperties, ReactNode } from 'react';
import { RifyBaseIcon } from '../../_internal';
import { useConfig, useRtl, useTheme } from '../../_mixins';
import { createKey } from '../../_utils';
import { resultLight } from '../styles';
import style from './styles/index.cssr';
import classNames from 'classnames';

export interface ResultProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'huge';
  title?: string;
  message?: string;
  children?: ReactNode;
  icon?: ReactNode;
  footer?: ReactNode;
}

const result: React.FC<ResultProps> = (props: ResultProps) => {
  const { mergedClsPrefix, mergedRtl } = useConfig();
  const theme = useTheme('Result', '-result', style, resultLight, mergedClsPrefix);
  const rtlEnabled = useRtl('Result', mergedRtl, mergedClsPrefix);

  const cssVars = () => {
    const { size = 'medium' } = props;
    const {
      common: { cubicBezierEaseInOut },
      self: {
        textColor,
        lineHeight,
        titleTextColor,
        titleFontWeight,
        [createKey('fontSize', size)]: fontSize,
        [createKey('titleFontSize', size)]: titleFontSize,
        [createKey('iconSize', size)]: iconSize,
      },
    } = theme;
    return {
      '--rify-bezier': cubicBezierEaseInOut,
      '--rify-font-size': fontSize,
      '--rify-icon-size': iconSize,
      '--rify-line-height': lineHeight,
      '--rify-text-color': textColor,
      '--rify-title-font-size': titleFontSize,
      '--rify-title-font-weight': titleFontWeight,
      '--rify-title-text-color': titleTextColor,
    };
  };

  return (
    <div
      className={classNames(
        `${mergedClsPrefix}-result`,
        {
          [`${mergedClsPrefix}-result--rtl`]: rtlEnabled,
        },
        props.className,
      )}
      style={cssVars() as CSSProperties}
    >
      {props.icon && (
        <div className={`${mergedClsPrefix}-result-icon`}>
          <RifyBaseIcon clsPrefix={mergedClsPrefix}>{props.icon}</RifyBaseIcon>
        </div>
      )}
      <div className={`${mergedClsPrefix}-result-header`}>
        {props.title ? <div className={`${mergedClsPrefix}-result-header__title`}>{props.title}</div> : null}
        {props.message ? <div className={`${mergedClsPrefix}-result-header__message`}>{props.message}</div> : null}
      </div>
      {props.children && <div className={`${mergedClsPrefix}-result-content`}>{props.children}</div>}
      {props.footer && <div className={`${mergedClsPrefix}-result-footer`}>{props.footer}</div>}
    </div>
  );
};

if (__DEV__) result.displayName = 'rify-result';

export default result;
