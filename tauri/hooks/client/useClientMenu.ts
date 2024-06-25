import { event } from '@tauri-apps/api';

export default () => {
  const listenStart = () => {
    event.listen('new', () => {
      console.log('menu action');
    });
  };

  const showAbout = (callback: VoidFunction) => {
    event.listen('about', () => callback());
  };

  return { listenStart, showAbout };
};
