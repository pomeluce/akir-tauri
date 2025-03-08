import RichTextEditor from 'reactjs-tiptap-editor';
import { BaseKit } from 'reactjs-tiptap-editor/extension-bundle';

const DEFAULT = '';

const Editor: React.FC<{}> = () => {
  const [content, setContent] = useState<string>(DEFAULT);

  const extensions = [
    BaseKit.configure({
      placeholder: {
        showOnlyCurrent: true,
      },

      characterCount: {
        limit: 50_000,
      },
    }),
  ];

  const handleChange = (value: string) => setContent(value);

  return <RichTextEditor output="html" content={content} onChangeContent={handleChange} extensions={extensions} />;
};

export default Editor;
