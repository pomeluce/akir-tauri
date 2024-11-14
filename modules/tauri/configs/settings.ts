import { General, Keymap, UI } from '@tauri/components';

export const settings = [
  {
    title: '通用',
    key: 'settings.general',
    content: General({}),
  },
  {
    title: '快捷键',
    key: 'settings.keymap',
    content: Keymap({}),
  },
  {
    title: '界面',
    key: 'settings.ui',
    content: UI({}),
  },
];

export const defaultKeys = 'settings.general';
