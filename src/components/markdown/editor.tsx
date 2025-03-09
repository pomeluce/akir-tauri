import RichTextEditor from 'reactjs-tiptap-editor';
import {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  LineHeight,
  Link,
  MoreMark,
  OrderedList,
  SlashCommand,
  Strike,
  Table,
  TaskList,
  TextAlign,
  TextDirection,
  Underline,
  Video,
  SearchAndReplace,
  Emoji,
  Katex,
  ExportPdf,
} from 'reactjs-tiptap-editor/extension-bundle';
import { locale } from 'reactjs-tiptap-editor/locale-bundle';
import './editor.css';

const DEFAULT = '';

const extensions = [
  BaseKit.configure({ characterCount: false }),
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  LineHeight,
  Link,
  MoreMark,
  OrderedList,
  SlashCommand,
  Strike,
  Table,
  TaskList,
  TextAlign,
  TextDirection,
  Underline,
  Video,
  SearchAndReplace,
  Emoji,
  Katex,
  ExportPdf,
];

const Editor: React.FC<{}> = () => {
  const [content, setContent] = useState<string>(DEFAULT);

  locale.setLang('zh_CN');

  const handleChange = (value: string) => setContent(value);

  return <RichTextEditor output="html" content={content} onChangeContent={handleChange} extensions={extensions} useEditorOptions={{ immediatelyRender: false }} hideToolbar />;
};

export default Editor;
