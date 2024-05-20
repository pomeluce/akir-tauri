import { Fragment } from 'react';
import { Editor } from '@tiptap/react';
import { RemixRender } from '@/components/remix';
import EditorMenuItem, { EditorBarItemProps } from './editor-menu-item';

const EditorBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const items: Array<EditorBarItemProps | { type: string }> = [
    {
      icon: RemixRender({ name: IconBold }),
      title: '粗体',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: RemixRender({ name: IconItalic }),
      title: '斜体',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: RemixRender({ name: IconStrikethrough }),
      title: '删除线',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: RemixRender({ name: IconCodeView }),
      title: '行内代码',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      icon: RemixRender({ name: IconMarkPenLine }),
      title: '高亮',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      icon: RemixRender({ name: IconH1 }),
      title: '一级标题',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: RemixRender({ name: IconH2 }),
      title: '二级标题',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: RemixRender({ name: IconParagraph }),
      title: '正文',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: RemixRender({ name: IconListUnordered }),
      title: '无序列表',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: RemixRender({ name: IconListOrdered }),
      title: '有序列表',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: RemixRender({ name: IconListCheck2 }),
      title: '待办',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList'),
    },
    {
      icon: RemixRender({ name: IconCodeBoxLine }),
      title: '代码块',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      type: 'divider',
    },
    {
      icon: RemixRender({ name: IconDoubleQuotesL }),
      title: '引用',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: RemixRender({ name: IconSeparator }),
      title: '分割线',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: RemixRender({ name: IconTextWrap }),
      title: '换行',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: RemixRender({ name: IconFormatClear }),
      title: '清除样式',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: RemixRender({ name: IconArrowGoBackLine }),
      title: '撤销',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: RemixRender({ name: IconArrowGoForwardLine }),
      title: '重做',
      action: () => editor.chain().focus().redo().run(),
    },
  ];
  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>{item.type === 'divider' ? <div className="divider" /> : <EditorMenuItem {...(item as EditorBarItemProps)} />}</Fragment>
      ))}
    </div>
  );
};

export default EditorBar;
