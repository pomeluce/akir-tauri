import { ThemePopup } from '@common/components';
import { Screen } from '@/components';

const topbarMenu: React.FC<{}> = () => {
  const { isAuthenticated } = useAuth();
  const { user } = useUserStore();

  const avatar = (className: string) => (
    <SuiAvatar className={className}>
      <SuiAvatarImage src={user.avatar} />
      <SuiAvatarFallback>{user.name}</SuiAvatarFallback>
    </SuiAvatar>
  );

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
      {isAuthenticated() ? (
        <SuiDropdownMenu>
          <SuiDropdownMenuTrigger>{avatar('w-8 h-8')}</SuiDropdownMenuTrigger>
          <SuiDropdownMenuContent className="p-2" align="end">
            <SuiDropdownMenuLabel>
              <div className="flex gap-2">
                {avatar('w-10 h-10')}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold">{user.name}</span>
                  <SuiBadge className="italic opacity-90">VIP</SuiBadge>
                </div>
              </div>
            </SuiDropdownMenuLabel>
            <SuiDropdownMenuSeparator />
            <SuiDropdownMenuGroup className="px-2">
              <SuiDropdownMenuItem className="py-3 flex gap-4">
                <IconRiUser3Line size={18} />
                <span>个人中心</span>
              </SuiDropdownMenuItem>
              <SuiDropdownMenuItem className="py-3 flex gap-4">
                <IconRiSettingsLine size={18} />
                <span>用户设置</span>
              </SuiDropdownMenuItem>
              <SuiDropdownMenuItem className="py-3 flex gap-4">
                <IconRiLogoutCircleRLine size={18} />
                <span>退出登录</span>
              </SuiDropdownMenuItem>
            </SuiDropdownMenuGroup>
          </SuiDropdownMenuContent>
        </SuiDropdownMenu>
      ) : (
        <div className="flex gap-2">
          <SuiButton size="xs" onClick={() => router.navigate({ to: RouteTo.LOGIN })}>
            登 录
          </SuiButton>
          <SuiButton size="xs" variant="outline" onClick={() => router.navigate({ to: RouteTo.REGISTER })}>
            注 册
          </SuiButton>
        </div>
      )}
    </section>
  );
};

export default topbarMenu;
