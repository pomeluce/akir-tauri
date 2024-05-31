import { AiEditor, AiEditorOptions, CustomMenu } from 'aieditor';
import classNames from 'classnames';
import './editor.scss';
import { merge } from 'lodash-es';

export interface EditorProps extends Omit<AiEditorOptions, 'element' | 'theme'> {}

const Editor: React.FC<EditorProps> = props => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultToolbarKeys: (string | CustomMenu)[] = [
    'undo',
    'redo',
    'brush',
    'eraser',
    '|',
    'heading',
    'font-family',
    'font-size',
    '|',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'code',
    'subscript',
    'superscript',
    'hr',
    'todo',
    'emoji',
    '|',
    'highlight',
    'font-color',
    '|',
    'align',
    'line-height',
    '|',
    'bullet-list',
    'ordered-list',
    'indent-decrease',
    'indent-increase',
    'break',
    '|',
    'image',
    'video',
    'attachment',
    'quote',
    'code-block',
    'table',
    '|',
    'printer',
    'fullscreen',
  ];

  const { theme } = useThemeStore();
  const {
    ai,
    contentRetention = true,
    contentRetentionKey = 'rify-editor-content',
    onChange,
    placeholder = '点击输入内容...',
    toolbarKeys = defaultToolbarKeys,
    ...restProps
  } = props;
  const [count, setCount] = useState<number>(0);

  const handleChange = (editor: AiEditor) => {
    setCount(editor.getText().length);
    onChange?.(editor);
  };

  useEffect(() => {
    if (ref.current) {
      const aiEditor = new AiEditor({
        ai: merge({ bubblePanelEnable: false } as typeof ai, ai),
        contentRetention,
        contentRetentionKey,
        element: ref.current,
        onChange: handleChange,
        placeholder,
        theme,
        toolbarKeys,
        ...restProps,
      });
      return () => {
        aiEditor.destroy();
      };
    }
  }, []);

  return (
    <div ref={ref} className={classNames('rify-editor', `aie-theme-${theme}`)}>
      <div className="aie-container">
        <div className="aie-container-header"></div>
        <div className="aie-container-main h-full overflow-scroll"></div>
        <div className="aie-container-footer">
          <footer>
            <div className="flex">
              <span>{count} 字符</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Editor;
