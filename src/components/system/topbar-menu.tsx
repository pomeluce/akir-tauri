import { Screen, AvatarMenu, Menu } from '@/components';
import { router } from '@/plugins';

const topbarMenu: React.FC<{}> = () => {
  const { theme, setTheme } = useThemeStore();
  const [themePopupVisible, setThemePopupVisible] = useState<boolean>(false);
  const { isLogin } = useAuth();

  const themePopup = () => {
    return (
      <main className="bg-backdrop2 shadow-xl border border-rim2 rounded cursor-pointer">
        <Menu
          className="theme-popup"
          options={[
            {
              key: 'theme-system',
              icon: IconRiComputerFill({ size: 16 }),
              label: '跟随系统',
              onClick: () => {
                setThemePopupVisible(false);
                setTheme('system');
              },
            },
            {
              key: 'theme-light',
              icon: IconRiSunFill({ size: 16 }),
              label: '亮色主题',
              onClick: () => {
                setThemePopupVisible(false);
                setTheme('light');
              },
            },
            {
              key: 'theme-dark',
              icon: IconRiMoonClearFill({ size: 16 }),
              label: '暗色主题',
              onClick: () => {
                setThemePopupVisible(false);
                setTheme('dark');
              },
            },
          ]}
        />
      </main>
    );
  };

  return (
    <section className="hidden md:flex items-center gap-5">
      <ArcoButton className="flex justify-center items-center" size="large" shape="circle">
        <Screen />
      </ArcoButton>
      <ArcoTrigger onClick={() => setThemePopupVisible(true)} popup={() => themePopup()} popupVisible={themePopupVisible} position="bottom">
        <ArcoButton className="flex justify-center items-center" size="large" shape="circle">
          {theme === 'system' ? <IconRiComputerFill size={20} /> : theme === 'light' ? <IconRiSunFill size={20} /> : <IconRiMoonClearFill size={20} />}
        </ArcoButton>
      </ArcoTrigger>
      {isLogin() ? (
        <AvatarMenu />
      ) : (
        <div className="flex gap-2">
          <ArcoButton type="primary" onClick={() => router.navigator({ name: RouteName.LOGIN })}>
            登录
          </ArcoButton>
          <ArcoButton onClick={() => router.navigator({ name: RouteName.REGISTER })}>注册</ArcoButton>
        </div>
      )}
    </section>
  );
};

export default topbarMenu;
