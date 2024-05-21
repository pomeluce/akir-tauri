import { Fragment, ReactNode, isValidElement } from 'react';
import { Editor } from '@tiptap/react';
import { RemixRender } from '@/components/remix';
import EditorMenuItem, { EditorBarItemType } from './editor-item';
import EditorColor from './editor-color';
import EditorDropmenu from './editor-dropmenu';

const EditorBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const items: Array<EditorBarItemType | EditorBarItemType[] | ReactNode> = [
    EditorDropmenu({
      icon: RemixRender({ name: IconParagraph }),
      title: '正文',
      item: [
        {
          icon: RemixRender({ name: IconParagraph, props: { size: 18 } }),
          title: '正文',
          action: () => editor.chain().focus().setParagraph().run(),
          isActive: () => editor.isActive('paragraph'),
        },
        {
          icon: RemixRender({ name: IconH1, props: { size: 18 } }),
          title: '一级标题',
          action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => editor.isActive('heading', { level: 1 }),
        },
        {
          icon: RemixRender({ name: IconH2, props: { size: 18 } }),
          title: '二级标题',
          action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => editor.isActive('heading', { level: 2 }),
        },
        {
          icon: RemixRender({ name: IconH3, props: { size: 18 } }),
          title: '三级标题',
          action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: () => editor.isActive('heading', { level: 3 }),
        },
        {
          icon: RemixRender({ name: IconH4, props: { size: 18 } }),
          title: '四级标题',
          action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
          isActive: () => editor.isActive('heading', { level: 4 }),
        },
        {
          icon: RemixRender({ name: IconH5, props: { size: 18 } }),
          title: '五级标题',
          action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
          isActive: () => editor.isActive('heading', { level: 5 }),
        },
        {
          icon: RemixRender({ name: IconH6, props: { size: 18 } }),
          title: '六级标题',
          action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
          isActive: () => editor.isActive('heading', { level: 6 }),
        },
      ],
    }),
    {
      icon: RemixRender({ name: IconDoubleQuotesL }),
      title: '引用',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      type: 'divider',
    },
    {
      icon: RemixRender({ name: IconBold }),
      title: '粗体',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: RemixRender({ name: IconUnderline }),
      title: '下划线',
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive('underline'),
    },
    {
      icon: RemixRender({ name: IconItalic }),
      title: '斜体',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    [
      {
        icon: RemixRender({ name: IconStrikethrough, props: { size: 18 } }),
        title: '删除线',
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive('strike'),
      },
      {
        icon: RemixRender({ name: IconCodeView, props: { size: 18 } }),
        title: '行内代码',
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: () => editor.isActive('code'),
      },
      {
        icon: RemixRender({ name: IconEraserFill, props: { size: 18 } }),
        title: '清除样式',
        action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
    ],
    EditorColor({ icon: RemixRender({ name: IconFontColor }), defaultColor: 'var(--hue-grey-10)', onChange: color => editor.chain().focus().setColor(color).run() }),
    EditorColor({
      icon: RemixRender({ name: IconCharacterRecognitionFill }),
      defaultColor: 'var(--hue-bg-2)',
      onChange: color => editor.chain().focus().toggleHighlight({ color }).run(),
    }),
    {
      type: 'divider',
    },
    EditorDropmenu({
      icon: '默认字号',
      title: '字号',
      item: [
        {
          icon: '默认字号',
          action: () => editor.chain().focus().unsetFontSize().run(),
          isActive: () => editor.isActive('textStyle', { fontSize: '' }),
        },

        ...['12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '22px', '24px', '29px', '32px', '40px', '48px'].map(
          size =>
            ({
              icon: size,
              action: () => editor.chain().focus().setFontSize(size).run(),
              isActive: () => editor.isActive('textStyle', { fontSize: size }),
            }) as EditorBarItemType,
        ),
      ],
    }),
    EditorDropmenu({
      icon: '默认字体',
      title: '字体',
      item: [
        {
          icon: '默认字体',
          action: () => editor.chain().focus().unsetFontFamily().run(),
          isActive: () => editor.isActive('textStyle', { fontFamily: '' }),
        },
        {
          icon: '方正楷体',
          className: 'font-STKaiTi',
          action: () => editor.chain().focus().setFontFamily('STKaiTi').run(),
          isActive: () => editor.isActive('textStyle', { fontFamily: 'STKaiTi' }),
        },
        {
          icon: '方正悠黑简',
          className: 'font-STYouHei',
          action: () => editor.chain().focus().setFontFamily('STYouHei').run(),
          isActive: () => editor.isActive('textStyle', { fontFamily: 'STYouHei' }),
        },
        {
          icon: 'Arial',
          className: 'font-Arial',
          action: () => editor.chain().focus().setFontFamily('Arial').run(),
          isActive: () => editor.isActive('textStyle', { fontFamily: 'Arial' }),
        },
        {
          icon: 'CascadiaMono',
          className: 'font-cascadia',
          action: () => editor.chain().focus().setFontFamily('CascadiaMono').run(),
          isActive: () => editor.isActive('textStyle', { fontFamily: 'CascadiaMono' }),
        },
        {
          icon: 'Inter',
          className: 'font-Inter',
          action: () => editor.chain().focus().setFontFamily('Inter').run(),
          isActive: () => editor.isActive('textStyle', { fontFamily: 'Inter' }),
        },
        {
          icon: 'Times New Roman',
          className: 'font-TimesNewRoman',
          action: () => editor.chain().focus().setFontFamily('Times New Roman').run(),
          isActive: () => editor.isActive('textStyle', { fontFamily: 'Times New Roman' }),
        },
      ],
    }),
    EditorDropmenu({
      icon: '默认行高',
      title: '行高',
      item: [
        {
          icon: '默认行高',
          action: () => editor.chain().focus().unsetLineHeight().run(),
          isActive: () => editor.isActive('paragraph', { lineHeight: '' }),
        },

        ...['1', '1.15', '1.5', '2', '2.5', '3'].map(
          height =>
            ({
              icon: height,
              action: () => editor.chain().focus().setLineHeight(height).run(),
              isActive: () => editor.isActive('paragraph', { lineHeight: height }),
            }) as EditorBarItemType,
        ),
      ],
    }),
    {
      type: 'divider',
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
      icon: RemixRender({ name: IconTextWrap }),
      title: '换行',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: RemixRender({ name: IconCodeBoxLine }),
      title: '代码块',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
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
        <Fragment key={index}>
          {isValidElement(item) ? (
            item
          ) : Array.isArray(item) || (item as EditorBarItemType).type !== 'divider' ? (
            <EditorMenuItem item={item as EditorBarItemType} />
          ) : (
            <div className="divider" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default EditorBar;
