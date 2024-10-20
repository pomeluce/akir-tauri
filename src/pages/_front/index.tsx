import { FlowEditor } from '@common/components';

export const Route = createFileRoute('/_front/')({
  component: () => (
    <SuiCard>
      <SuiCardHeader>
        <SuiCardTitle className="pb-3 border-b">
          <header>首页</header>
        </SuiCardTitle>
      </SuiCardHeader>
      <SuiCardContent className="h-[1000px]">
        <FlowEditor />
      </SuiCardContent>
    </SuiCard>
  ),
});
