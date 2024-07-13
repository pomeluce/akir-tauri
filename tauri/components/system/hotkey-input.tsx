import classNames from 'classnames';
import './styles/hotkey-input.scss';

interface HotkeyInputProps {
  className?: string;
  defaultHotkeys?: string[];
  maxCount?: number;
  placeholder?: string;
  range?: ('NUMBER' | 'NUMPAD' | 'ABC' | 'FN')[];
  style?: React.CSSProperties;
  onAddHotkey?: (key: string) => void;
  onHotkeyVerify?: (key: string) => boolean | Promise<boolean>;
  onDeleteHotkey?: (key: string) => void;
}

const hotkeyInput: React.FC<HotkeyInputProps> = props => {
  const { className, defaultHotkeys = [], maxCount, placeholder, range = ['NUMBER', 'NUMPAD', 'ABC', 'FN'], style, onAddHotkey, onHotkeyVerify, onDeleteHotkey } = props;
  const [hotkeys, setHotkeys] = useState<string[]>(defaultHotkeys);
  const [focused, setFocused] = useState<boolean>(false);
  const [keyRange, setKeyRange] = useState<string[]>([]);

  const CODE_NUMBER = Array.from({ length: 10 }, (_, k) => `Digit${k + 1}`);
  const CODE_NUMPAD = Array.from({ length: 10 }, (_, k) => `Numpad${k + 1}`);
  const CODE_ABC = Array.from({ length: 26 }, (_, k) => `Key${String.fromCharCode(k + 65).toUpperCase()}`);
  const CODE_FN = Array.from({ length: 12 }, (_, k) => `F${k + 1}`);
  const CODE_CONTROL = ['Shift', 'ShiftLeft', 'ShiftRight', 'Control', 'ControlLeft', 'ControlRight', 'Alt', 'AltLeft', 'AltRight'];

  const rangeKeys = { NUMBER: CODE_NUMBER, NUMPAD: CODE_NUMPAD, ABC: CODE_ABC, FN: CODE_FN };

  const handleFocus = () => {
    setFocused(!hotkeys.length);
  };

  const addHotkey = (key: string) => {
    // 如果已经存在, 则不添加
    if (hotkeys.some(hotkey => hotkey === key)) return;
    // 判断是否超过最大数量
    if (hotkeys.length && hotkeys.length === maxCount) return;
    // 快捷键添加之前的校验函数
    if (onHotkeyVerify?.(key)) {
      const verify = onHotkeyVerify(key);
      if (verify instanceof Promise) {
        verify.then(value => {
          if (value) {
            onAddHotkey?.(key);
            setHotkeys([...hotkeys, key]);
          }
        });
      }
      if (verify === true) {
        onAddHotkey?.(key);
        setHotkeys([...hotkeys, key]);
      }
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { ctrlKey, shiftKey, altKey, key, code } = e;
    if (!CODE_CONTROL.includes(key)) {
      if (!keyRange.includes(code)) return;

      let shortcut = '';

      [
        { key: ctrlKey, text: 'ctrl' },
        { key: shiftKey, text: 'shift' },
        { key: altKey, text: 'alt' },
      ].forEach(currenKey => {
        if (currenKey.key) {
          shortcut += shortcut ? `+${currenKey.text}` : currenKey.text;
        }
      });

      if (key) {
        shortcut += shortcut ? `+${key.toLowerCase()}` : key.toLowerCase();
      }

      addHotkey(shortcut);
    }
    e.preventDefault();
  };

  const handleDelete = (index: number) => {
    onDeleteHotkey?.(hotkeys[index]);
    setHotkeys(preHotkeys => preHotkeys.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setKeyRange(range.reduce((acc, r) => [...acc, ...rangeKeys[r]], [] as string[]));
  }, []);

  useEffect(() => {
    handleFocus();
  }, [hotkeys]);

  return (
    <div
      className={classNames('hotkey-input', { cursor: focused }, className)}
      tabIndex={0}
      style={style}
      onFocus={handleFocus}
      onBlur={() => setFocused(false)}
      onKeyDown={handleKeydown}
    >
      {hotkeys.length ? (
        hotkeys.map((hotkey, index) => (
          <span key={`hotkey-${index}`} className="hotkey-input__key">
            <span>{hotkey.toUpperCase()}</span>
            <span className="hotkey-input__key--close" onClick={() => handleDelete(index)}>
              <IconRiCloseCircleLine />
            </span>
          </span>
        ))
      ) : (
        <div className="hotkey-input__placeholder">{placeholder}</div>
      )}
    </div>
  );
};

export default hotkeyInput;
