import { MenuOptionType } from '@/rify';

const items: MenuOptionType[] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <IconMail />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <IconAllApplication />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <IconSetting />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

const Home: React.FC<{}> = () => {
  return (
    <RifyCard className="h-2000px" title="我是标题">
      <RifyMenu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="horizontal" options={items} />
    </RifyCard>
  );
};

export default Home;
