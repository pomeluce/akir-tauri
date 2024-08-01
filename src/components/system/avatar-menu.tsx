const avatarMenu: React.FC<{}> = () => {
  const { user } = useUserStore();

  const avatar = (className: string) => (
    <SuiAvatar className={className}>
      <SuiAvatarImage src={user.avatar} />
      <SuiAvatarFallback>{user.name}</SuiAvatarFallback>
    </SuiAvatar>
  );

  return (
    <SuiDropdownMenu>
      <SuiDropdownMenuTrigger>{avatar('w-8 h-8')}</SuiDropdownMenuTrigger>
      <SuiDropdownMenuContent className="p-2">
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
  );
};

export default avatarMenu;
