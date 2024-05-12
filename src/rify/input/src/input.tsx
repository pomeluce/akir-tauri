import { CSSProperties, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { useConfig, useFormItem } from '../../_mixins';
import { OnUpdateValue, Size } from './interface';
import classNames from 'classnames';
import { MaybeArray } from '../../_utils';
import { FormValidationStatus } from '../../form/src/interface';

export interface InputProps {
  bordered: boolean | undefined;
  type: 'text' | 'textarea' | 'password';
  placeholder: string | [string, string];
  defaultValue: null | string | [string, string];
  value: null | string | [string, string];
  disabled: boolean | undefined;
  size: Size;
  rows: number | string;
  round: boolean;
  minlength: number | string;
  maxlength: number | string;
  clearable: boolean;
  autosize: boolean | { minRows?: number; maxRows?: number };
  pair: boolean;
  separator: string;
  readonly: [string, boolean];
  passivelyActivated: boolean;
  showPasswordOn: 'mousedown' | 'click';
  stateful: boolean;
  autofocus: boolean;
  inputProps: TextareaHTMLAttributes | InputHTMLAttributes;
  resizable: boolean;
  showCount: boolean;
  loading: boolean;
  allowInput: (value: string) => boolean;
  renderCount: (props: { value: string }) => ReactNode;
  onMousedown: (e: MouseEvent) => void;
  onKeydown: (e: KeyboardEvent) => void;
  onKeyup: (e: KeyboardEvent) => void;
  onInput: OnUpdateValue;
  onFocus: MaybeArray<(e: FocusEvent) => void>;
  onBlur: MaybeArray<(e: FocusEvent) => void>;
  onClick: MaybeArray<(e: MouseEvent) => void>;
  onChange: OnUpdateValue;
  onClear: MaybeArray<(e: MouseEvent) => void>;
  countGraphemes: (value: string) => number;
  status: FormValidationStatus;
  'onUpdate:value': MaybeArray<OnUpdateValue>;
  onUpdateValue: MaybeArray<OnUpdateValue>;
  /** private */
  textDecoration: string | [string, string];
  attrSize: number;
  onInputBlur: MaybeArray<(e: FocusEvent) => void>;
  onInputFocus: MaybeArray<(e: FocusEvent) => void>;
  onDeactivate: MaybeArray<() => void>;
  onActivate: MaybeArray<() => void>;
  onWrapperFocus: MaybeArray<(e: FocusEvent) => void>;
  onWrapperBlur: MaybeArray<(e: FocusEvent) => void>;
  internalDeactivateOnEnter: Boolean;
  internalForceFocus: Boolean;
  internalLoadingBeforeSuffix: boolean;
}

const input: React.FC<InputProps> = props => {
  const { mergedClsPrefix, mergedRtl } = useConfig();
  const {} = props;

  const formItem = useFormItem(props);
  const { mergedSize, mergedDisabled, mergedStatus } = formItem;

  return (
    <div
      ref="wrapperElRef"
      className={classNames(`${mergedClsPrefix}-input`, {
        [`${mergedClsPrefix}-input--${mergedStatus}-status`]: mergedStatus,
        [`${mergedClsPrefix}-input--rtl`]: rtlEnabled,
        [`${mergedClsPrefix}-input--disabled`]: mergedDisabled,
        [`${mergedClsPrefix}-input--textarea`]: type === 'textarea',
        [`${mergedClsPrefix}-input--resizable`]: resizable && !autosize,
        [`${mergedClsPrefix}-input--autosize`]: autosize,
        [`${mergedClsPrefix}-input--round`]: round && !(type === 'textarea'),
        [`${mergedClsPrefix}-input--pair`]: pair,
        [`${mergedClsPrefix}-input--focus`]: mergedFocus,
        [`${mergedClsPrefix}-input--stateful`]: stateful,
      })}
      style={cssVars() as CSSProperties}
      tabIndex={!mergedDisabled && passivelyActivated && !activated ? 0 : undefined}
      onFocus={handleWrapperFocus}
      onBlur={handleWrapperBlur}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyUp={handleWrapperKeyup}
      onKeyDown={handleWrapperKeydown}
    ></div>
  );
};

export default input;
