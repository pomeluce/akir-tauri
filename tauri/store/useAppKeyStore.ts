import { create } from 'zustand';
import { core, window } from '@tauri-apps/api';
import { platform } from '@tauri-apps/plugin-os';
import hotkeys from 'hotkeys-js';
import useDBSettings from '@tauri/hooks/db/useDBSettings';

interface AppKeyState {
  keymaps: { id: string; key: string[]; label: string; event: () => void }[];
  registerKey: () => void;
  bindHotKey: (id: string, key: string) => void;
  rebindHotKey: (id: string, key: string) => void;
  unbindHotKey: (id: string, key: string) => void;
  getAllHotkeys: () => string[];
}

const mod = platform() === 'macos' ? 'command' : 'ctrl';

const { queryByType, addOrUpdate } = useDBSettings();

const KEY_TYPE = 'settings.keymap';

const getKeymaps = async () => {
  const keys = await queryByType('settings.keymap');
  return keys.map(keymap => {
    keymap.key = keymap.key.replace(`${keymap.type}.`, '');
    return keymap;
  });
};

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

  registerKey: async () => {
    const keys = await getKeymaps();
    const keymaps = get().keymaps;

    for (const keymap of keymaps) {
      const km = keys.find(item => keymap.id === item.key);
      if (km) keymap.key = JSON.parse(km.value);
      hotkeys(keymap.key.join(','), keymap.event);
    }

    set({ keymaps });
  },

  bindHotKey: (id: string, key: string) => {
    const index = get().keymaps.findIndex(item => item.id === id);
    if (index !== -1) {
      const keymap = get().keymaps[index];
      hotkeys.unbind(keymap.key.join(','));
      keymap.key.push(key);
      hotkeys(keymap.key.join(','), keymap.event);
      set(state => ({ keymaps: [...state.keymaps.toSpliced(index, 1, keymap)] }));
      addOrUpdate(`${KEY_TYPE}.${keymap.id}`, KEY_TYPE, JSON.stringify(keymap.key));
    }
  },

  rebindHotKey: (id: string, key: string) => {
    const target = get().keymaps.find(item => item.key.includes(key));
    if (target) get().unbindHotKey(target.id, key);
    get().bindHotKey(id, key);
  },

  unbindHotKey: (id: string, key: string) => {
    const index = get().keymaps.findIndex(item => item.id === id);
    if (index !== -1) {
      const keymap = get().keymaps[index];
      hotkeys.unbind(keymap.key.join(','));
      keymap.key = keymap.key.filter(k => k !== key);
      hotkeys(keymap.key.join(','), keymap.event);
      set(state => ({ keymaps: [...state.keymaps.toSpliced(index, 1, keymap)] }));
      addOrUpdate(`${KEY_TYPE}.${keymap.id}`, KEY_TYPE, JSON.stringify(keymap.key));
    }
  },

  getAllHotkeys: () => {
    return hotkeys.getAllKeyCodes().map(item => item.shortcut);
  },
}));
