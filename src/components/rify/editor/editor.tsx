import EditorMenu from './editor-menu';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import CodeBlock from './code-block';
import { createLowlight, common } from 'lowlight';
import './styles/editor.scss';

const lowlight = createLowlight(common);

const Editor: React.FC<{}> = () => {
  const editor = useEditor({
    extensions: [
      Color,
      CharacterCount.configure({
        limit: 10000,
      }),
      // 代码高亮
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({
        lowlight,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TaskList,
      TaskItem,
      TextStyle,
      StarterKit.configure({
        codeBlock: false,
      }),
    ],
  });

  return (
    <div className="editor">
      {editor && <EditorMenu editor={editor} />}
      <EditorContent spellCheck={false} className="editor__content" editor={editor} />
    </div>
  );
};

export default Editor;
