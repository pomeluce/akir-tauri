import { create } from 'zustand';

export interface ThemeState {
  mode: 'light' | 'dark' | 'system';
  theme: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

const storage = useStorage();

export default create<ThemeState>()(set => ({
  mode: storage.get(CacheKey.THEME_MODE, 'system'),
  theme: (() => {
    const theme = storage.get(CacheKey.THEME_MODE, 'system');
    return theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
  })(),

  setThemeMode: mode => {
    const theme = 'system' === mode ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;
    document.documentElement.dataset.theme = theme;
    document.body.setAttribute('arco-theme', theme);
    set({ theme, mode });
    storage.set(CacheKey.THEME_MODE, mode);
  },
}));
