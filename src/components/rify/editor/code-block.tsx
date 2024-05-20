import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';

const CodeBlock: React.FC<NodeViewProps> = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}) => {
  return (
    <NodeViewWrapper className="code-block">
      <ArcoSelect
        size="mini"
        bordered={false}
        arrowIcon={null}
        defaultValue={defaultLanguage || 'auto'}
        onChange={value => {
          updateAttributes({ language: value });
        }}
      >
        <ArcoSelect.Option value="auto">auto</ArcoSelect.Option>
        {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
          <ArcoSelect.Option key={index} value={lang}>
            {lang}
          </ArcoSelect.Option>
        ))}
      </ArcoSelect>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlock;
