import { ItemGroup } from 'rc-menu';
import { OptionType } from '../src/interface';
import MenuDivider from '../src/menu-divider';
import MenuOption from '../src/menu-option';
import SubMenu from '../src/sub-menu';

const convertItemsToNodes = (list: OptionType[]) => {
  return (list || [])
    .map((opt, index) => {
      if (opt && typeof opt === 'object') {
        const { label, children, key, type, ...restProps } = opt as any;
        const mergedKey = key ?? `tmp-${index}`;

        // MenuItemGroup & SubMenuItem
        if (children || type === 'group') {
          if (type === 'group') {
            // Group
            return (
              <ItemGroup key={mergedKey} {...restProps} title={label}>
                {convertItemsToNodes(children)}
              </ItemGroup>
            );
          }

          // Sub Menu
          return (
            <SubMenu key={mergedKey} {...restProps} title={label}>
              {convertItemsToNodes(children)}
            </SubMenu>
          );
        }

        // MenuItem & Divider
        if (type === 'divider') {
          return <MenuDivider key={mergedKey} {...restProps} />;
        }

        return (
          <MenuOption key={mergedKey} {...restProps}>
            {label}
          </MenuOption>
        );
      }

      return null;
    })
    .filter(opt => opt);
};

const useOptions = (options?: OptionType[]) => {
  return useMemo(() => {
    if (!options) {
      return options;
    }
    return convertItemsToNodes(options);
  }, [options]);
};
export default useOptions;
