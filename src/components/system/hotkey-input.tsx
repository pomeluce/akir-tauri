import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from '@/shadcn';
import classNames from 'classnames';
import './styles/hotkey-input.css';
import { TbCirclePlus, TbCircleX } from 'react-icons/tb';

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
  onChangeHotkey?: (keys: string[]) => void;
}

const HotkeyInput: React.FC<HotkeyInputProps> = props => {
  const {
    className,
    defaultHotkeys = [],
    maxCount,
    placeholder,
    range = ['NUMBER', 'NUMPAD', 'ABC', 'FN'],
    style,
    onAddHotkey,
    onHotkeyVerify,
    onDeleteHotkey,
    onChangeHotkey,
  } = props;

  const [hotkeys, setHotkeys] = useState<string[]>(defaultHotkeys);
  const [focused, setFocused] = useState<boolean>(false);
  const [keyRange, setKeyRange] = useState<string[]>([]);
  const [ofIndex, setOfIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const ofRef = useRef<HTMLButtonElement>(null);
  const hotkeysRef = useRef<(HTMLSpanElement | null)[]>([]);

  const CODE_NUMBER = Array.from({ length: 10 }, (_, k) => `Digit${k + 1}`);
  const CODE_NUMPAD = Array.from({ length: 10 }, (_, k) => `Numpad${k + 1}`);
  const CODE_ABC = Array.from({ length: 26 }, (_, k) => `Key${String.fromCharCode(k + 65).toUpperCase()}`);
  const CODE_FN = Array.from({ length: 12 }, (_, k) => `F${k + 1}`);
  const CODE_CONTROL = ['Shift', 'ShiftLeft', 'ShiftRight', 'Control', 'ControlLeft', 'ControlRight', 'Alt', 'AltLeft', 'AltRight'];

  const rangeKeys = { NUMBER: CODE_NUMBER, NUMPAD: CODE_NUMPAD, ABC: CODE_ABC, FN: CODE_FN };

  const handleFocus = () => {
    setFocused(!hotkeys.length);
  };

  const addHotkey = async (key: string) => {
    // 如果已经存在, 则不添加
    if (hotkeys.some(hotkey => hotkey === key)) return;
    // 判断是否超过最大数量
    if (hotkeys.length && hotkeys.length === maxCount) return;
    // 快捷键添加之前的校验函数
    const verify = onHotkeyVerify?.(key);
    if (verify !== undefined && ((verify instanceof Promise && !(await verify)) || (typeof verify === 'boolean' && !verify))) return;

    setHotkeys(preHotkeys => [...preHotkeys, key]);
    onAddHotkey?.(key);
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
    setOfIndex(0);
  };

  useEffect(() => {
    setKeyRange(range.reduce((acc, r) => [...acc, ...rangeKeys[r]], [] as string[]));
  }, []);

  useEffect(() => {
    if (ref.current && ref.current === document.activeElement) {
      handleFocus();
    }
    onChangeHotkey?.(hotkeys);
  }, [hotkeys]);

  useEffect(() => {
    setHotkeys(defaultHotkeys);
  }, [props]);

  useLayoutEffect(() => {
    let ofWidth = ofRef.current?.offsetWidth || 0;
    if (ofRef.current?.classList?.contains('hidden')) {
      ofRef.current?.classList.remove('hidden');
      ofWidth = ofRef.current?.offsetWidth || 0;
      ofRef.current?.classList.add('hidden');
    }
    const containerWidth = (ref.current?.offsetWidth || 0) - ofWidth - 20;
    let keysWidth = 0;

    hotkeysRef.current.some((el, index) => {
      if (el) {
        keysWidth += el.offsetWidth + 8;
        // 判断是否溢出
        if (containerWidth < keysWidth) {
          setOfIndex(index);
          return true;
        }
      }
    });
  }, [hotkeys]);

  const keyPopup = () => (
    <div className={ofIndex ? 'hotkey-input-of' : ''}>
      {(ofIndex ? hotkeys.slice(ofIndex) : []).map((hotkey, index) => (
        <span key={`hotkey-${index}`} className="hotkey-input__key">
          <span>{hotkey.toUpperCase()}</span>
          <span
            className="hotkey-input__key--close"
            onClick={() => {
              handleDelete(index + ofIndex);
              setVisible(!!ofIndex);
            }}
          >
            <TbCircleX />
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className={classNames('hotkey-input', { cursor: focused }, className)}
      tabIndex={0}
      style={style}
      onFocus={handleFocus}
      onBlur={() => setFocused(false)}
      onKeyDown={handleKeydown}
    >
      {hotkeys.length ? (
        (ofIndex ? hotkeys.slice(0, ofIndex) : hotkeys).map((hotkey, index) => (
          <span
            ref={el => {
              hotkeysRef.current[index] = el;
            }}
            key={`hotkey-${index}`}
            className="hotkey-input__key"
          >
            <span>{hotkey.toUpperCase()}</span>
            <span className="hotkey-input__key--close" onClick={() => handleDelete(index)}>
              <TbCircleX size={18} strokeWidth={1} />
            </span>
          </span>
        ))
      ) : (
        <div className="hotkey-input__placeholder">{placeholder}</div>
      )}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            ref={ofRef}
            variant="link"
            className={ofIndex ? 'px-1 hover:no-underline' : 'hidden px-1 hover:no-underline'}
            size="sm"
            onClick={() => setVisible(!visible)}
            style={{ backgroundColor: 'transparent' }}
          >
            <span className="flex justify-center items-center">
              <TbCirclePlus />
              <span>More</span>
            </span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="shadow-md w-auto p-0" sideOffset={-5}>
          {keyPopup()}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default HotkeyInput;
