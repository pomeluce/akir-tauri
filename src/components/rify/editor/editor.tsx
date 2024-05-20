import EditorMenu from './editor-menu';
// import { TiptapCollabProvider } from '@hocuspocus/provider'
import CharacterCount from '@tiptap/extension-character-count';
// import Collaboration from '@tiptap/extension-collaboration';
// import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight, common } from 'lowlight';
import './styles/editor.scss';

const lowlight = createLowlight(common);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

const Editor: React.FC<{}> = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
      // Collaboration.configure({
      //   document: ydoc,
      // }),
      // CollaborationCursor.configure({
      //   provider: websocketProvider,
      // }),
      // 代码高亮
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
  });

  return (
    <div className="editor">
      {editor && <EditorMenu editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
      {/* <div className="editor__footer"> */}
      {/*   <div className={`editor__status editor__status--${status}`}> */}
      {/*     {status === 'connected' */}
      {/*       ? `${editor.storage.collaborationCursor.users.length} user${editor.storage.collaborationCursor.users.length === 1 ? '' : 's'} online in ${room}` */}
      {/*       : 'offline'} */}
      {/*   </div> */}
      {/*   <div className="editor__name"> */}
      {/*     <button onClick={setName}>{currentUser.name}</button> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
};

export default Editor;
