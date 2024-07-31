import { Editor } from '@/components';
import classNames from 'classnames';

const components: React.FC<{}> = () => {
  const [activeTab, setActiveTab] = useState<string>('editor');

  const handleTabChange = (value: string) => setActiveTab(value);

  return (
    <SuiCard>
      <SuiCardHeader>
        <SuiCardTitle className="pb-3 border-b">组件列表</SuiCardTitle>
      </SuiCardHeader>
      <SuiCardContent>
        <SuiTabs defaultValue="editor" onValueChange={handleTabChange}>
          <SuiTabsList>
            <SuiTabsTrigger value="editor">富文本编辑器</SuiTabsTrigger>
            <SuiTabsTrigger value="markdown">Markdown编辑器</SuiTabsTrigger>
          </SuiTabsList>
          <SuiTabsContent value="editor">
            <Editor />
          </SuiTabsContent>
          <SuiTabsContent className={classNames({ hidden: activeTab !== 'markdown' })} value="markdown" forceMount></SuiTabsContent>
        </SuiTabs>
      </SuiCardContent>
    </SuiCard>
  );
};

export default components;
