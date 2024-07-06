import { createContext, ReactNode } from 'react';

const storage = useStorage();

type ModeType = 'light' | 'dark';

export const ThemeContext = createContext<{ mode: ModeType; theme: ThemeType; setTheme: (theme: ThemeType) => void } | undefined>(undefined);

export const ThemeProvider = (props: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(storage.get(CacheKey.THEME_MODE) || 'system');
  const [mode, setMode] = useState<ModeType>('light');
  useEffect(() => {
    const mode = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;

    document.documentElement.dataset.theme = mode;
    document.body.setAttribute('arco-theme', mode);
    setMode(mode);
  }, [theme]);

  const listenerSystemColorMode = useCallback(
    (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const mode = e.matches ? 'dark' : 'light';
        document.documentElement.dataset.theme = mode;
        document.body.setAttribute('arco-theme', mode);
        setMode(mode);
      }
    },
    [theme],
  );

  useEffect(() => {
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    colorScheme.addEventListener('change', listenerSystemColorMode);
    return () => {
      colorScheme.removeEventListener('change', listenerSystemColorMode);
    };
  }, [listenerSystemColorMode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        setTheme: (theme: ThemeType) => {
          setTheme(theme);
          storage.set(CacheKey.THEME_MODE, theme);
        },
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
