export default () => {
  const keybind = <K extends 'keyup' | 'keydown' | 'keypress'>(key: string, type: K, callback: () => void) => {
    const keymap = key.split('+');
    const modifierKeys = {
      ctrl: 'ctrlKey',
      cmd: 'metaKey',
      ctrlorcmd: navigator.userAgentData?.platform.includes('Mac') ? 'metaKey' : 'ctrlKey', // 处理跨平台
      cmdorctrl: navigator.userAgentData?.platform.includes('Mac') ? 'metaKey' : 'ctrlKey', // 处理跨平台
      alt: 'altKey',
      shift: 'shiftKey',
      meta: 'metaKey',
    };
    const requiredModifiers = keymap.filter(k => k.toLowerCase() in modifierKeys);
    const otherKey = keymap.find(k => !(k.toLowerCase() in modifierKeys)) || '';
    document.addEventListener(type, event => {
      const allModifiersPressed = requiredModifiers.every(
        mod => event[modifierKeys[mod.toLowerCase() as 'ctrl' | 'cmd' | 'alt' | 'shift' | 'ctrlorcmd' | 'cmdorctrl' | 'meta'] as 'altKey' | 'shiftKey' | 'metaKey' | 'ctrlKey'],
      );
      if (allModifiersPressed && (event.key === otherKey.toLowerCase() || otherKey === '')) callback();
    });
  };

  return { keybind };
};
