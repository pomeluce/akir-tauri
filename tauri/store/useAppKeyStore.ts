import { create } from 'zustand';
import { core, window } from '@tauri-apps/api';
import { platform } from '@tauri-apps/plugin-os';
import hotkeys from 'hotkeys-js';

interface AppKeyState {
  keymaps: { id: string; key: string[]; label: string; event: () => void }[];
  registerKey: (key: string, event: string) => void;
  rebindHotKey: (id: string, key: string) => void;
  toggleHotKey: (id: string, key: string) => void;
  deleteHotKey: (id: string, key: string) => void;
  getAllHotkeys: () => string[];
}

const mod = platform() === 'macos' ? 'command' : 'ctrl';

export default create<AppKeyState>()((set, get) => ({
  keymaps: [
    {
      id: 'km_close_win',
      key: ['alt+f4'],
      label: '关闭窗口',
      event: () => {
        window.getCurrent().close();
      },
    },
    {
      id: 'km_quit',
      key: [`${mod}+q`],
      label: '退出',
      event: () => {
        window.getCurrent().hide();
      },
    },
    {
      id: 'km_devtolls',
      key: ['shift+f12'],
      label: '开发者工具',
      event: () => {
        core.invoke('toggle_devtools');
      },
    },
  ],

  registerKey: () => {
    for (const keymap of get().keymaps) {
      hotkeys(keymap.key.join(','), keymap.event);
    }
  },

  toggleHotKey: (id: string, key: string) => {
    const index = get().keymaps.findIndex(item => item.id === id);
    if (index !== -1) {
      const keymap = get().keymaps[index];
      hotkeys.unbind(keymap.key.join(','));
      keymap.key.push(key);
      hotkeys(keymap.key.join(','), keymap.event);
      set(state => ({ keymaps: [...state.keymaps.toSpliced(index, 1, keymap)] }));
    }
  },

  rebindHotKey: (id: string, key: string) => {
    const target = get().keymaps.find(item => item.key.includes(key));
    if (target) get().deleteHotKey(target.id, key);
    get().toggleHotKey(id, key);
  },

  deleteHotKey: (id: string, key: string) => {
    const index = get().keymaps.findIndex(item => item.id === id);
    if (index !== -1) {
      const keymap = get().keymaps[index];
      hotkeys.unbind(keymap.key.join(','));
      keymap.key = keymap.key.filter(k => k !== key);
      hotkeys(keymap.key.join(','), keymap.event);
      set(state => ({ keymaps: [...state.keymaps.toSpliced(index, 1, keymap)] }));
    }
  },

  getAllHotkeys: () => {
    return hotkeys.getAllKeyCodes().map(item => item.shortcut);
  },
}));
