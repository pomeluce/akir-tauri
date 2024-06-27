export default () => {
  const { mode, setThemeMode } = useThemeStore();

  const listenerColorMode = useCallback(() => setThemeMode(mode), [mode]);

  const colorScheme = (listenerColorMode: VoidFunction) => {
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    colorScheme.addEventListener('change', listenerColorMode);
    return () => {
      colorScheme.removeEventListener('change', listenerColorMode);
    };
  };

  return { listenerColorMode, colorScheme };
};
