import avatar from '@/assets/images/avatar.png';
import { Menu } from '../arco';

const avatarMenu: React.FC<{}> = () => {
  const dropList = Menu({
    options: [
      {
        key: '1',
        icon: IconPeople({}),
        label: '个人中心',
      },
      {
        key: '2',
        icon: IconEditName({}),
        label: '修改资料',
      },
      {
        key: '3',
        icon: IconLogout({}),
        label: '退出登录',
      },
    ],
  });

  return (
    <ArcoDropdown droplist={dropList} position="bottom">
      <ArcoAvatar className="w-8 h-8">
        <img src={avatar} />
      </ArcoAvatar>
    </ArcoDropdown>
  );
};

export default avatarMenu;
