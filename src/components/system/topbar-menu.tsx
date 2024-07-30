import { Screen, AvatarMenu } from '@/components';
import { ThemePopup } from '@common/components';
import { router } from '@/plugins';

const topbarMenu: React.FC<{}> = () => {
  const { isLogin } = useAuth();

  return (
    <section className="hidden md:flex items-center gap-5">
      <SuiButton className="rounded-full" variant="secondary" size="icon">
        <Screen />
      </SuiButton>
      <ThemePopup
        content={theme => (
          <SuiButton className="rounded-full" variant="secondary" size="icon">
            {(theme === 'system' ? IconRiComputerFill : theme === 'light' ? IconRiSunFill : IconRiMoonClearFill)({ size: 20 })}
          </SuiButton>
        )}
      />
      {isLogin() ? (
        <AvatarMenu />
      ) : (
        <div className="flex gap-2">
          <SuiButton size="xs" onClick={() => router.navigator({ name: RouteName.LOGIN })}>
            登 录
          </SuiButton>
          <SuiButton size="xs" variant="outline" onClick={() => router.navigator({ name: RouteName.REGISTER })}>
            注 册
          </SuiButton>
        </div>
      )}
    </section>
  );
};

export default topbarMenu;
