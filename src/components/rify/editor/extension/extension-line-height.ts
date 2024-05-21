import { Extension } from '@tiptap/react';

export interface LineHeightOptions {
  types: string[];
  heights: string[];
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the line height attribute
       */
      setLineHeight: (height: string) => ReturnType;
      /**
       * Unset the text align attribute
       */
      unsetLineHeight: () => ReturnType;
    };
  }
}

export default Extension.create<LineHeightOptions>({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['heading', 'paragraph'],
      heights: ['1', '1.15', '1.5', '2', '2.5', '3'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: element => element.style.lineHeight,
            renderHTML: attributes => {
              return !attributes.lineHeight ? {} : { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (height: string) =>
        ({ commands }) => {
          if (!this.options.heights.includes(height)) {
            return false;
          }
          return this.options.types.every(type => commands.updateAttributes(type, { lineHeight: height }));
        },

      unsetLineHeight:
        () =>
        ({ commands }) => {
          return this.options.types.every(type => commands.resetAttributes(type, 'lineHeight'));
        },
    };
  },
});
