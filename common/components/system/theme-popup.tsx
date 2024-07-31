const themePopup: React.FC<{ size?: number; content: (value: ThemeType) => React.ReactNode }> = ({ size, content }) => {
  const { theme, setTheme } = useTheme();

  const iconProps = size ? { size } : {};

  return (
    <SuiDropdownMenu>
      <SuiDropdownMenuTrigger asChild>
        <span>{content(theme)}</span>
      </SuiDropdownMenuTrigger>
      <SuiDropdownMenuContent className="min-w-0">
        <SuiDropdownMenuGroup className="flex flex-col justify-center items-center gap-3 p-1">
          <SuiDropdownMenuItem className="py-2 flex gap-4" onClick={() => setTheme('system')}>
            {IconRiComputerFill(iconProps)}
            <span>跟随系统</span>
          </SuiDropdownMenuItem>
          <SuiDropdownMenuItem className="py-2 flex gap-4" onClick={() => setTheme('light')}>
            {IconRiSunFill(iconProps)}
            <span>亮色主题</span>
          </SuiDropdownMenuItem>
          <SuiDropdownMenuItem className="py-2 flex gap-4" onClick={() => setTheme('dark')}>
            {IconRiMoonClearFill(iconProps)}
            <span>暗色主题</span>
          </SuiDropdownMenuItem>
        </SuiDropdownMenuGroup>
      </SuiDropdownMenuContent>
    </SuiDropdownMenu>
  );
};

export default themePopup;
