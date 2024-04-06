import RcMenu, { MenuRef as RcMenuRef, MenuProps as RcMenuProps } from 'rc-menu';
import { MenuTheme, OptionType } from './interface';
import useOptions from '../hooks/useOptions';
import { ReactNode } from 'react';

export interface MenuProps extends Omit<RcMenuProps, 'items'> {
  theme?: MenuTheme;
  inlineIndent?: number;
  defaultExpandedKeys?: string[];
  options?: OptionType[];
  children?: ReactNode;
}

const menu: React.ForwardRefRenderFunction<RcMenuRef, MenuProps> = (props, ref) => {
  const { options, children } = props;
  const mergedChildren = useOptions(options) || children;
  return (
    <RcMenu ref={ref} {...props}>
      {mergedChildren}
    </RcMenu>
  );
};

if (__DEV__) menu.displayName = 'rify-menu';

export default forwardRef(menu);
