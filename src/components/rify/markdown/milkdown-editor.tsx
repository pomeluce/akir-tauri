import { Editor, defaultValueCtx, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { history } from '@milkdown/plugin-history';
import { clipboard } from '@milkdown/plugin-clipboard';
import { cursor } from '@milkdown/plugin-cursor';
import { prism, prismConfig } from '@milkdown/plugin-prism';
import { math } from '@milkdown/plugin-math';
import { tooltip, TooltipView } from './tooltip';
import { IndentConfigOptions, indent, indentConfig } from '@milkdown/plugin-indent';
import { slash, SlashView } from './slash';
import { BlockView } from './block';
import { block } from '@milkdown/plugin-block';
import { ProsemirrorAdapterProvider, usePluginViewFactory } from '@prosemirror-adapter/react';
import { refractor } from 'refractor/lib/all';
import '@milkdown/theme-nord/style.css';
import 'prism-themes/themes/prism-one-dark.min.css';
import 'katex/dist/katex.min.css';
import './milkdown-editor.scss';

const markdown = `# Milkdown React Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **React**.`;

const MarkEditor: React.FC<{}> = () => {
  const pluginViewFactory = usePluginViewFactory();

  useEditor(root => {
    return Editor.make()
      .config(nord)
      .config(ctx => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, markdown);
        ctx.set(prismConfig.key, { configureRefractor: _ => refractor });
        ctx.set(tooltip.key, { view: pluginViewFactory({ component: TooltipView }) });
        ctx.set(slash.key, { view: pluginViewFactory({ component: SlashView }) });
        ctx.set(indentConfig.key, { type: 'space', size: 4 } as IndentConfigOptions);
        ctx.set(block.key, { view: pluginViewFactory({ component: BlockView }) });
      })
      .use(commonmark)
      .use(gfm)
      .use(history)
      .use(clipboard)
      .use(cursor)
      .use(prism)
      .use(math)
      .use(tooltip)
      .use(slash)
      .use(indent)
      .use(block);
  }, []);
  return <Milkdown />;
};

export default () => (
  <MilkdownProvider>
    <ProsemirrorAdapterProvider>
      <MarkEditor />
    </ProsemirrorAdapterProvider>
  </MilkdownProvider>
);
