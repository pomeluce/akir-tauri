import { general, keymap, ui } from '@/components';

export const settings = [
  {
    title: '通用',
    key: 'settings.general',
    content: general,
  },
  {
    title: '快捷键',
    key: 'settings.keymap',
    content: keymap,
  },
  {
    title: '界面',
    key: 'settings.ui',
    content: ui,
  },
];

export const defaultKeys = 'settings.general';
