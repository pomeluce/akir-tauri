import { Extension } from '@tiptap/react';

export interface IndentOptions {
  types: string[];
  level: string;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export default Extension.create<IndentOptions>({
  name: 'indent',

  addOptions() {
    return {
      types: ['heading', 'paragraph'],
      level: '2em',
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            parseHTML: element => element.style.textIndent,
            renderHTML: attributes => {
              return !attributes.indent ? {} : { style: `text-indent: ${attributes.indent}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ commands }) => {
          return this.options.types.every(type => commands.updateAttributes(type, { indent: this.options.level }));
        },

      outdent:
        () =>
        ({ commands }) => {
          return this.options.types.every(type => commands.resetAttributes(type, 'indent'));
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor.commands.indent();
      },
      'Shift-Tab': () => {
        return this.editor.commands.outdent();
      },
    };
  },
});
