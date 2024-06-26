import { create } from 'zustand';

export interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (value: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}

const storage = useStorage();

export default create<ThemeState>()((set, get) => ({
  theme: storage.get(CacheKey.THEME_MODE, 'light'),

  setTheme: value => {
    let theme = value;
    if ('system' === value) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = isDark ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
    document.body.setAttribute('arco-theme', theme);
    set({ theme: value });
    storage.set(CacheKey.THEME_MODE, value);
  },

  toggleTheme: () => {
    set({ theme: get().theme === 'light' ? 'dark' : 'light' });
    const current = get().theme;
    document.documentElement.dataset.theme = current;
    document.body.setAttribute('arco-theme', current);
    storage.set(CacheKey.THEME_MODE, current);
  },
}));
