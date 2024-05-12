import { MouseEvent } from 'react';
import { useStyle } from '../../../_mixins';
import style from './styles/index.cssr';
import { RifyBaseIcon } from '../..';

interface BaseCloseProps {
  className?: string;
  isButtonTag?: boolean;
  clsPrefix: string;
  disabled?: boolean;
  focusable?: boolean;
  round?: boolean;
  onClick?: (e: MouseEvent) => void;
  absolute?: boolean;
}

const close: React.FC<BaseCloseProps> = props => {
  useStyle('-base-close', style, props.clsPrefix);

  const { clsPrefix, disabled, absolute, round, isButtonTag } = props;
  const Tag = isButtonTag ? 'button' : 'div';

  return (
    <Tag
      type={isButtonTag ? 'button' : undefined}
      tabIndex={disabled || !props.focusable ? -1 : 0}
      aria-disabled={disabled}
      aria-label="close"
      role={isButtonTag ? undefined : 'button'}
      disabled={disabled}
      className={[
        `${clsPrefix}-base-close`,
        absolute && `${clsPrefix}-base-close--absolute`,
        disabled && `${clsPrefix}-base-close--disabled`,
        round && `${clsPrefix}-base-close--round`,
        props.className || '',
      ]
        .filter(cls => cls)
        .join(' ')
        .trimEnd()}
      onMouseDown={e => {
        if (!props.focusable) {
          e.preventDefault();
        }
      }}
      onClick={props.onClick}
    >
      <RifyBaseIcon clsPrefix={clsPrefix}>
        <IconClose />
      </RifyBaseIcon>
    </Tag>
  );
};

if (__DEV__) close.displayName = 'rify-base-close';

export default close;
