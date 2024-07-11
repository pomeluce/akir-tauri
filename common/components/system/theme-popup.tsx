import { Menu } from '../arco';

const themePopup: React.FC<{ iconSize?: number }> = ({ iconSize: size = 18 }) => {
  const { theme, setTheme } = useTheme();
  const [themePopupVisible, setThemePopupVisible] = useState<boolean>(false);

  const themePopup = () => {
    return (
      <main className="bg-backdrop2 shadow-xl border border-rim2 rounded cursor-pointer">
        <Menu
          className="theme-popup"
          selectedKeys={[`theme-${theme}`]}
          options={[
            {
              key: 'theme-system',
              icon: IconRiComputerFill({ size }),
              label: '跟随系统',
              onClick: () => {
                setThemePopupVisible(false);
                setTheme('system');
              },
            },
            {
              key: 'theme-light',
              icon: IconRiSunFill({ size }),
              label: '亮色主题',
              onClick: () => {
                setThemePopupVisible(false);
                setTheme('light');
              },
            },
            {
              key: 'theme-dark',
              icon: IconRiMoonClearFill({ size }),
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
    <ArcoTrigger
      onClickOutside={() => setThemePopupVisible(false)}
      onClick={() => setThemePopupVisible(true)}
      popup={() => themePopup()}
      popupVisible={themePopupVisible}
      position="bottom"
    >
      <ArcoButton className="flex justify-center items-center" size="large" shape="circle">
        {theme === 'system' ? <IconRiComputerFill size={size} /> : theme === 'light' ? <IconRiSunFill size={size} /> : <IconRiMoonClearFill size={size} />}
      </ArcoButton>
    </ArcoTrigger>
  );
};

export default themePopup;
