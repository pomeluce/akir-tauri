import { OptionType, RemixRender } from '@/components';
import { http } from '@/plugins';

type MenuType = OptionType & { iconName: keyof typeof import('@remixicon/react'); blank: string; children: MenuType[]; order: number };

const { navigator, open, matchName } = useRouter();

const getMenuOptions = (list: MenuType[], icons: any, key: string) => {
  return (list || []).map((item, index) => {
    const { children, iconName, key: _key, ...info } = item;
    const mergedKey = key ? `${key}-${index + 1}` : (index + 1).toString();
    const option = { key: mergedKey, ...info } as OptionType;
    if (option?.type === 'submenu' || option?.type === 'group') option.children = getMenuOptions(children, icons, mergedKey);
    if (iconName && (option?.type === 'submenu' || option?.type === 'item')) option.icon = RemixRender({ name: icons[iconName], props: { size: 18 } });
    if (option?.type === 'submenu') option.contentClassName = 'font-semibold';
    if (option?.type === 'item' && _key) {
      option.key = _key;
      const router = matchName(_key);
      option.onClick = () => (item.blank && router ? open(router, item.blank) : navigator({ name: _key }));
    }
    return option;
  });
};

export default () => {
  const getMenus = async () => {
    const icons = await import('@remixicon/react');
    const {
      data: { front, backend },
    } = await http.request<ResultModel<{ front: MenuType[]; backend: MenuType[] }>>({ url: RequestURL.MENU_LIST }, { message: false });

    return { front: getMenuOptions(front, icons, ''), backend: getMenuOptions(backend, icons, '') };
  };

  return { getMenus };
};
