import { Extension } from '@tiptap/react';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    highlight: {
      /**
       * Set the font size attribute
       */
      setHighlight: (highlight: string) => ReturnType;
      /**
       * Unset the font size attribute
       */
      unsetHighlight: () => ReturnType;
    };
  }
}

type HighlightOptions = {
  types: string[];
  getStyle: (highlight: string) => string;
};

export default Extension.create<HighlightOptions>({
  name: 'highlight',

  addOptions(): HighlightOptions {
    return {
      types: ['textStyle'],
      getStyle: (highlight: string) => {
        return `background-color: ${highlight}`;
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          highlight: {
            default: null,
            parseHTML: element => element.getAttribute('data-color') || element.style.backgroundColor,
            renderHTML: attributes => {
              return !attributes.highlight ? {} : { 'data-color': attributes.highlight, style: this.options.getStyle(attributes.highlight) };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setHighlight:
        highlight =>
        ({ chain }) => {
          return chain().setMark('textStyle', { highlight: highlight }).run();
        },
      unsetHighlight:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { highlight: null }).removeEmptyTextStyle().run();
        },
    };
  },
});
