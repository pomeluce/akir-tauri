import { Screen, AvatarMenu } from '@/components';
import { router } from '@/plugins';

const topbarMenu: React.FC<{}> = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { isLogin } = useAuth();

  return (
    <section className="hidden md:flex items-center gap-5">
      <ArcoButton className="flex justify-center items-center" size="large" shape="circle">
        <Screen />
      </ArcoButton>
      <ArcoButton className="flex justify-center items-center" size="large" shape="circle" onClick={() => toggleTheme()}>
        {theme === 'light' ? <IconRiSunFill size={20} /> : <IconRiMoonClearFill size={20} />}
      </ArcoButton>
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
