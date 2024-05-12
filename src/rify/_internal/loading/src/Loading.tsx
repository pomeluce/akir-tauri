import { HTMLAttributes } from 'react';
import { useStyle } from '../../../_mixins';
import style from './styles/index.cssr';
import classNames from 'classnames';

const duration = '1.6s';

export type BaseLoadingExposedProps = {
  strokeWidth?: number;
  stroke?: string;
};

interface BaseLoadingProps extends HTMLAttributes<HTMLDivElement> {
  clsPrefix: string;
  show?: boolean;
  scale?: number;
  radius?: number;
}

const loading: React.FC<BaseLoadingProps & BaseLoadingExposedProps> = props => {
  useStyle('-base-loading', style, props.clsPrefix);
  const { className, clsPrefix, radius = 100, strokeWidth = 28, stroke, show = true, scale = 1 } = props;
  const scaledRadius = radius / scale;

  return (
    <div className={classNames(`${clsPrefix}-base-loading`, className)} role="img" aria-label="loading">
      {show ? (
        <div key="icon" className={`${clsPrefix}-base-loading__transition-wrapper`}>
          <div className={`${clsPrefix}-base-loading__container`}>
            <svg className={`${clsPrefix}-base-loading__icon`} viewBox={`0 0 ${2 * scaledRadius} ${2 * scaledRadius}`} xmlns="http://www.w3.org/2000/svg" style={{ color: stroke }}>
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={`0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}`}
                  begin="0s"
                  dur={duration}
                  fill="freeze"
                  repeatCount="indefinite"
                />
                <circle
                  className={`${clsPrefix}-base-loading__icon`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  cx={scaledRadius}
                  cy={scaledRadius}
                  r={radius - strokeWidth / 2}
                  strokeDasharray={5.67 * radius}
                  strokeDashoffset={18.48 * radius}
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values={`0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}`}
                    begin="0s"
                    dur={duration}
                    fill="freeze"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-dashoffset"
                    values={`${5.67 * radius};${1.42 * radius};${5.67 * radius}`}
                    begin="0s"
                    dur={duration}
                    fill="freeze"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </svg>
          </div>
        </div>
      ) : (
        <div key="placeholder" className={`${clsPrefix}-base-loading__placeholder`}>
          {props.children}
        </div>
      )}
    </div>
  );
};

if (__DEV__) loading.displayName = 'rify-base-loading';

export default loading;
