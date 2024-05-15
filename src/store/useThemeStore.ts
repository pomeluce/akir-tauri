import { create } from 'zustand';

export interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (value: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const storage = useStorage();

export default create<ThemeState>()((set, get) => ({
  theme: storage.get(CacheKey.THEME_MODE, 'light'),

  setTheme: value => {
    document.documentElement.dataset.theme = value;
    document.body.setAttribute('arco-theme', value);
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
