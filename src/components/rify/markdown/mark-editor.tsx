import { Editor, defaultValueCtx, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';

import '@milkdown/theme-nord/style.css';
import './mark-editor.scss';

const markdown = `# Milkdown React Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **React**.`;

const MarkEditor: React.FC<{}> = () => {
  useEditor(root =>
    Editor.make()
      .config(nord)
      .config(ctx => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, markdown);
      })
      .use(commonmark),
  );
  return <Milkdown />;
};

export default () => (
  <MilkdownProvider>
    <MarkEditor />
  </MilkdownProvider>
);
