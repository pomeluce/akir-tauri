import Menu from '@/rify/menu/src/index';
import { MenuProps } from '@/rify/menu/src/menu';

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

const items: MenuItem[] = [
  getItem('Option 1', '1', <IconChartPie />),
  getItem('Option 2', '2', <IconComputer />),
  getItem('Option 3', '3', <IconInbox />),

  getItem('Navigation One', 'sub1', <IconMail />, [getItem('Option 5', '5'), getItem('Option 6', '6'), getItem('Option 7', '7'), getItem('Option 8', '8')]),

  getItem('Navigation Two', 'sub2', <IconAllApplication />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

const Home: React.FC<{}> = () => {
  return (
    <RifyCard className="h-2000px" title="我是标题">
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} theme="dark" inlineCollapsed options={items} />
    </RifyCard>
  );
};

export default Home;
