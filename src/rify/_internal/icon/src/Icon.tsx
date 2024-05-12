import { MouseEvent, ReactNode } from 'react';
import { useStyle } from '../../../_mixins';
import style from './styles/index.cssr';

interface BaseIconProps {
  role?: string;
  ariaLabel?: string;
  ariaDisabled?: boolean;
  ariaHidden?: boolean;
  clsPrefix: string;
  onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
  children?: ReactNode;
}

const icon: React.FC<BaseIconProps> = props => {
  useStyle('-base-icon', style, props.clsPrefix);

  return (
    <i
      className={`${props.clsPrefix}-base-icon`}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      role={props.role}
      aria-label={props.ariaLabel}
      aria-hidden={props.ariaHidden}
      aria-disabled={props.ariaDisabled}
    >
      {props.children}
    </i>
  );
};

if (__DEV__) icon.displayName = 'rify-base-icon';

export default icon;
