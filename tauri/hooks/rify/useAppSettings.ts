import general from '@tauri/views/setting/general';
import keymap from '@tauri/views/setting/keymap';
import ui from '@tauri/views/setting/ui';

export default () => {
  const settings = [
    {
      title: '通用',
      key: 'settings.general',
      content: general({}),
    },
    {
      title: '快捷键',
      key: 'settings.keymap',
      content: keymap({}),
    },
    {
      title: '界面',
      key: 'settings.ui',
      content: ui({}),
    },
  ];

  const defaultKeys = ['settings.general'];

  return { defaultKeys, settings };
};
