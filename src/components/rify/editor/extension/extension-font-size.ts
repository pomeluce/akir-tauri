import { Extension } from '@tiptap/react';
import '@tiptap/extension-text-style';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size attribute
       */
      setFontSize: (size: string) => ReturnType;
      /**
       * Unset the font size attribute
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

type FontSizeOptions = {
  types: string[];
  getStyle: (fontSize: string) => string;
};

export default Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions(): FontSizeOptions {
    return {
      types: ['textStyle'],
      getStyle: (fontSize: string) => {
        return `font-size: ${fontSize}`;
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              return !attributes.fontSize
                ? {}
                : {
                    style: this.options.getStyle(attributes.fontSize),
                  };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        fontSize =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
        },
    };
  },
});
