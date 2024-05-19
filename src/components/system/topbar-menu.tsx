import { Screen, Sun, Moon, AvatarMenu } from '@/components';

const topbarMenu: React.FC<{}> = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { isLogin } = useAuth();
  const { navigator } = useRouter();

  return (
    <section className="hidden md:flex items-center gap-5">
      <ArcoButton className="flex justify-center items-center" size="large" shape="circle">
        <Screen />
      </ArcoButton>
      <ArcoButton className="flex justify-center items-center" size="large" shape="circle" onClick={() => toggleTheme()}>
        {theme === 'light' ? <Sun className="w-5" /> : <Moon className="w-5" />}
      </ArcoButton>
      {isLogin() ? (
        <AvatarMenu />
      ) : (
        <div className="flex gap-2">
          <ArcoButton type="primary" onClick={() => navigator({ name: RouteName.LOGIN })}>
            登录
          </ArcoButton>
          <ArcoButton onClick={() => navigator({ name: RouteName.REGISTER })}>注册</ArcoButton>
        </div>
      )}
    </section>
  );
};

export default topbarMenu;
