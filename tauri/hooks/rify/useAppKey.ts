import { window } from '@tauri-apps/api';
import hotkeys from 'hotkeys-js';

export default () => {
  const keymaps = [
    {
      id: 'km_new',
      key: 'ctrl+n,command+n',
      label: '新建',
      event: () => {
        console.log('new event run');
      },
    },
    {
      id: 'km_open',
      key: 'ctrl+o,command+o',
      label: '打开',
      event: () => {
        console.log('open event run');
      },
    },
    {
      id: 'km_close_win',
      key: 'alt+f4',
      label: '关闭窗口',
      event: () => {
        window.getCurrent().close();
      },
    },
    {
      id: 'km_quit',
      key: 'ctrl+q,command+q',
      label: '退出',
      event: () => {
        window.getCurrent().hide();
      },
    },
  ];

  const registerKey = () => {
    for (const keymap of keymaps) {
      hotkeys(keymap.key, keymap.event);
    }
  };

  return { keymaps, registerKey };
};
