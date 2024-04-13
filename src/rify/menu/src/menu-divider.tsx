import { CSSProperties, HTMLAttributes } from 'react';
import { Divider } from 'rc-menu';
import MenuContext from './menu-context';
import classNames from 'classnames';

export interface MenuDividerProps extends HTMLAttributes<HTMLLIElement> {
  className?: string;
  style?: CSSProperties;
  dashed?: boolean;
}

const menuDivider: React.FC<MenuDividerProps> = props => {
  const { className, dashed, ...restProps } = props;
  const { mergedClsPrefix } = useContext(MenuContext);
  const classString = classNames({ [`${mergedClsPrefix}-item-divider-dashed`]: !!dashed }, className);

  return <Divider className={classString} {...restProps} />;
};

export default menuDivider;
