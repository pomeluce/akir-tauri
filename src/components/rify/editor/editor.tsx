import EditorMenu from './editor-menu';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from './extension/extension-font-size';
import Highlight from '@tiptap/extension-highlight';
import LineHeight from './extension/extension-line-height';
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
      FontFamily,
      FontSize,
      Highlight.configure({
        multicolor: true,
      }),
      LineHeight,
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
