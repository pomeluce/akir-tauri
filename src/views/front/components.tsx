import { Editor, MarkEditor } from '@/components';

const components: React.FC<{}> = () => {
  return (
    <ArcoCard className="p-3" title="组件列表">
      <ArcoTabs defaultActiveTab="2" type="rounded">
        <ArcoTabs.TabPane key="1" title="富文本编辑器">
          <Editor />
        </ArcoTabs.TabPane>
        <ArcoTabs.TabPane key="2" title="Markdown编辑器">
          <MarkEditor />
        </ArcoTabs.TabPane>
      </ArcoTabs>
    </ArcoCard>
  );
};

export default components;
