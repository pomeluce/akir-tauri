import { createContext, ReactNode } from 'react';

type ModeType = 'light' | 'dark';

export const ThemeContext = createContext<{ mode: ModeType; theme: ThemeType; setTheme: (theme: ThemeType) => void } | undefined>(undefined);

export const ThemeProvider = (props: { children: ReactNode; defaultTheme?: ThemeType; handleToggle?: (theme: ThemeType) => void; handleSet?: (theme: ThemeType) => void }) => {
  const [theme, setTheme] = useState<ThemeType>(props.defaultTheme || 'system');
  const [mode, setMode] = useState<ModeType>('light');
  useEffect(() => {
    const mode = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;

    document.documentElement.dataset.theme = mode;
    document.body.setAttribute('arco-theme', mode);
    setMode(mode);
    props.handleToggle?.(theme);
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
          props.handleSet?.(theme);
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
