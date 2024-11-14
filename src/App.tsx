const App: React.FC<{}> = () => {
  const storage = useStorage();
  const themeMode = storage.get(CacheKey.THEME_MODE, 'system');
  const themeHandle = (theme: ThemeType) => {
    storage.set(CacheKey.THEME_MODE, theme);
  };

  const { AppRouterProvider } = useAppRouter();

  return (
    <ThemeProvider defaultTheme={themeMode} handleToggle={themeHandle}>
      <AppRouterProvider />
    </ThemeProvider>
  );
};

export default App;
