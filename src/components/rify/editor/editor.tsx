import EditorMenu from './editor-menu';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from './extension/extension-font-size';
import Heading from './extension/extension-heading';
import Highlight from './extension/extension-highlight';
import Indent from './extension/extension-indent';
import LineHeight from './extension/extension-line-height';
import Link from '@tiptap/extension-link';
import Paragraph from './extension/extension-paragrah';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import CodeBlock from './code-block';
import { createPortal } from 'react-dom';
import { createLowlight, common } from 'lowlight';
import './styles/editor.scss';

const lowlight = createLowlight(common);

const Editor: React.FC<{}> = () => {
  const editor = useEditor({
    extensions: [
      Color,
      CharacterCount.configure({ limit: 10000 }),
      // 代码高亮
      CodeBlockLowlight.extend({ addNodeView: () => ReactNodeViewRenderer(CodeBlock) }).configure({ lowlight }),
      FontFamily,
      FontSize,
      Heading,
      Highlight,
      Indent,
      LineHeight,
      Link.configure({ openOnClick: 'whenNotEditable', autolink: false }),
      Paragraph,
      TaskList,
      TaskItem,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      StarterKit.configure({ codeBlock: false, heading: false, paragraph: false }),
    ],
  });

  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const current = ref.current?.getBoundingClientRect();
    console.log(current?.left, current?.top);

    (document.querySelector('#tiptap') as HTMLDivElement).addEventListener('click', event => {
      console.log(event.clientX, event.clientY);
    });
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);

  return (
    <div className="tiptap-editor">
      {editor && <EditorMenu editor={editor} />}
      <EditorContent ref={ref} id="tiptap" spellCheck={false} className="tiptap-editor__content" editor={editor} />
      {show && createPortal(<div className="absolute">测试</div>, ref.current!)}
    </div>
  );
};

export default Editor;
