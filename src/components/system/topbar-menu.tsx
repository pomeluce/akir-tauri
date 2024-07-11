import { Screen, AvatarMenu } from '@/components';
import { ThemePopup } from '@common/components';
import { router } from '@/plugins';

const topbarMenu: React.FC<{}> = () => {
  const { isLogin } = useAuth();

  return (
    <section className="hidden md:flex items-center gap-5">
      <ArcoButton className="flex justify-center items-center" size="large" shape="circle">
        <Screen />
      </ArcoButton>
      <ThemePopup iconSize={20} />
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
