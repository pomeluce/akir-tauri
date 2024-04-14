import Menu, { MenuProps } from '@/rify/menu/src/menu';

type MenuItem = Required<MenuProps>['options'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['options'] = [
  getItem('Navigation One', 'sub1', <IconMail />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),

  getItem('Navigation Two', 'sub2', <IconAllApplication />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <IconSetting />, [getItem('Option 9', '9'), getItem('Option 10', '10'), getItem('Option 11', '11'), getItem('Option 12', '12')]),

  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

const Home: React.FC<{}> = () => {
  return (
    <RifyCard className="h-2000px" title="我是标题">
      <Menu theme="dark" inlineCollapsed collapsedWidth={35} options={items} />
    </RifyCard>
  );
};

export default Home;
