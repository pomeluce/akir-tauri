import EditorMenu from './editor-menu';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import CodeBlock from './code-block';
import { createLowlight, common } from 'lowlight';
import './styles/editor.scss';

const lowlight = createLowlight(common);

const Editor: React.FC<{}> = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
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
