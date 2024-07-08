import general from '@tauri/views/setting/general';
import ui from '@tauri/views/setting/ui';

export default () => {
  const settings = [
    {
      title: '通用',
      key: 'settings.general',
      content: general({}),
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
