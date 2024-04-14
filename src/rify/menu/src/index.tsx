import { MenuOptionType, OptionType } from './interface';
import { MenuRef as RcMenuRef, ItemGroup } from 'rc-menu';
import MenuOption from './menu-option';
import SubMenu from './sub-menu';
import MenuDivider from './menu-divider';
import InternalMenu, { MenuProps } from './menu';

export type MenuRef = {
  menu: RcMenuRef | null;
  focus: (options?: FocusOptions) => void;
};

type ComponentProps = MenuProps & React.RefAttributes<MenuRef>;

type GenericItemType<T = unknown> = T extends infer U extends MenuOptionType ? (unknown extends U ? OptionType : OptionType<U>) : OptionType;

type GenericComponentProps<T = unknown> = Omit<ComponentProps, 'items'> & {
  options?: GenericItemType<T>[];
};

type CompoundedComponent = React.ForwardRefExoticComponent<GenericComponentProps> & {
  Option: typeof MenuOption;
  SubMenu: typeof SubMenu;
  Divider: typeof MenuDivider;
  ItemGroup: typeof ItemGroup;
};

interface GenericComponent extends Omit<CompoundedComponent, ''> {
  <T extends MenuOptionType>(props: GenericComponentProps<T>): ReturnType<CompoundedComponent>;
}

const Menu = forwardRef<MenuRef, MenuProps>((props, ref) => {
  const menuRef = useRef<RcMenuRef>(null);

  useImperativeHandle(ref, () => ({
    menu: menuRef.current,
    focus: options => {
      menuRef.current?.focus(options);
    },
  }));
  return <InternalMenu ref={menuRef} {...props} />;
}) as GenericComponent;

export default Menu;
