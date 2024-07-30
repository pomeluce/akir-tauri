import { OptionType } from '@common/components';
import { http, router } from '@/plugins';

type MenuType = OptionType & { blank: string; children: MenuType[]; order: number };

const { open } = useUtils();

const getMenuOptions = (list: MenuType[], key: string) => {
  return (list || []).map((item, index) => {
    const { children, key: _key, ...info } = item;
    const mergedKey = key ? `${key}-${index + 1}` : (index + 1).toString();
    const option = { key: mergedKey, ...info } as OptionType;
    if (option?.type === 'submenu' || option?.type === 'group') option.children = getMenuOptions(children, mergedKey);
    if ((option?.type === 'submenu' || option?.type === 'item') && _key) {
      option.key = _key;
      const record = router.matchName(_key);
      record?.meta?.icon && (option.icon = record.meta.icon({ size: 18 }));
      option?.type === 'item' && (option.onClick = () => (item.blank && record ? open(router.resolve(record), item.blank) : router.navigator({ name: _key })));
    }
    if (option?.type === 'submenu') option.contentClassName = 'font-semibold';
    return option;
  });
};

export default () => {
  const getMenus = async () => {
    const {
      data: { front, backend },
    } = await http.request<ResultModel<{ front: MenuType[]; backend: MenuType[] }>>({ url: RequestURL.MENU_LIST }, { message: false });

    return { front: getMenuOptions(front, ''), backend: getMenuOptions(backend, '') };
  };

  return { getMenus };
};
