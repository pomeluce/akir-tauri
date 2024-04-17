import { SpinProps } from "../spin";

export interface LoadOptions {
  isShow?: boolean;
  color?: SpinProps['stroke'];
  size?: SpinProps['size'];
  strokeWidth?: SpinProps['strokeWidth'];
  message?: SpinProps['description'];
  bgColor?: SpinProps['bgColor'];
  zIndex?: SpinProps['zIndex'];
}
