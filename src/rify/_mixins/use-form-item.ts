import { createContext } from 'react';
import type { FormValidationStatus } from '../form/src/interface';

type FormItemSize = 'small' | 'medium' | 'large';
type AllowedSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | number;

export interface FormItemInjection {
  path: string | undefined;
  disabled: boolean;
  mergedSize: FormItemSize;
  mergedValidationStatus: FormValidationStatus | undefined;
  restoreValidation: () => void;
  handleContentBlur: () => void;
  handleContentFocus: () => void;
  handleContentInput: () => void;
  handleContentChange: () => void;
}

export const FormItemContext = createContext<FormItemInjection | null>(null);

interface UseFormItemOptions<T> {
  defaultSize?: FormItemSize;
  mergedSize?: (formItem: FormItemInjection | null) => T;
  mergedDisabled?: (formItem: FormItemInjection | null) => boolean;
}

interface UseFormItemProps<T> {
  size?: T;
  disabled?: boolean;
  status?: FormValidationStatus;
}

export interface UseFormItem<T> {
  mergedSize: T;
  mergedDisabled: boolean;
  mergedStatus: FormValidationStatus | undefined;
  triggerFormBlur: () => void;
  triggerFormChange: () => void;
  triggerFormFocus: () => void;
  triggerFormInput: () => void;
}

export default function useFormItem<T extends AllowedSize = FormItemSize>(
  props: UseFormItemProps<T>,
  { defaultSize = 'medium', mergedSize, mergedDisabled }: UseFormItemOptions<T> = {},
): UseFormItem<T> {
  const FormItem = useContext<FormItemInjection | null>(FormItemContext);

  const mergedSizeValue = () => {
    if (mergedSize) return mergedSize(FormItem);
    const { size } = props;
    if (size) return size;
    if (FormItem) {
      const { mergedSize } = FormItem;
      if (mergedSize !== undefined) return mergedSize as T;
    }
    return defaultSize as T;
  };

  const mergedDisabledValue = () => {
    if (mergedDisabled) return mergedDisabled(FormItem);
    const { disabled } = props;
    if (disabled !== undefined) return disabled;
    if (FormItem) {
      return FormItem.disabled;
    }
    return false;
  };

  const mergedStatus = () => {
    const { status } = props;
    if (status) return status;
    return FormItem?.mergedValidationStatus;
  };

  useEffect(() => {
    if (FormItem) FormItem.restoreValidation();
  }, []);

  return {
    mergedSize: mergedSizeValue(),
    mergedDisabled: mergedDisabledValue(),
    mergedStatus: mergedStatus(),
    triggerFormBlur() {
      if (FormItem) FormItem.handleContentBlur();
    },
    triggerFormChange() {
      if (FormItem) FormItem.handleContentChange();
    },
    triggerFormFocus() {
      if (FormItem) FormItem.handleContentFocus();
    },
    triggerFormInput() {
      if (FormItem) FormItem.handleContentInput();
    },
  };
}
