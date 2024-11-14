import hotkeys from 'hotkeys-js';

hotkeys.filter = event => {
  const target = event.target as HTMLElement;
  return !target.classList.contains('hotkey-input');
};

export const setup = () => {};
