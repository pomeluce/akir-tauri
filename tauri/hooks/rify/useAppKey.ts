import { core, window } from '@tauri-apps/api';
import { platform } from '@tauri-apps/plugin-os';
import hotkeys from 'hotkeys-js';

export default () => {
  const mod = platform() === 'macos' ? 'command' : 'ctrl';

  const keymaps = [
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
  ];

  const registerKey = () => {
    for (const keymap of keymaps) {
      hotkeys(keymap.key.join(','), keymap.event);
    }
  };

  const toggleHotKey = (id: string, key: string) => {
    const result = keymaps.filter(key => key.id === id);
    if (result.length) {
      const keymap = result[0];
      hotkeys.unbind(keymap.key.join(','));
      keymap.key.push(key);
      hotkeys(keymap.key.join(','), keymap.event);
    }
  };

  const rebindHotKey = (id: string, key: string) => {
    const result = keymaps.filter(keymap => keymap.key.includes(key));
    if (result.length) {
      const keymap = result[0];
      hotkeys.unbind(keymap.key.join(','));
      keymap.key = keymap.key.filter(k => k !== key);
      hotkeys(keymap.key.join(','), keymap.event);
    }
    toggleHotKey(id, key);
  };

  const deleteHotKey = (id: string, key: string) => {
    const result = keymaps.filter(key => key.id === id);
    if (result.length) {
      const keymap = result[0];
      hotkeys.unbind(keymap.key.join(','));
      keymap.key = keymap.key.filter(k => k !== key);
      hotkeys(keymap.key.join(','), keymap.event);
    }
  };

  const getAllHotkeys = () => {
    return hotkeys.getAllKeyCodes().map(item => item.shortcut);
  };

  return { keymaps, registerKey, rebindHotKey, toggleHotKey, deleteHotKey, getAllHotkeys };
};
