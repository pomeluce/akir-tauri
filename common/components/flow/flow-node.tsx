import { Handle, Node, NodeProps, Position } from '@xyflow/react';

type NodeDataProps = {
  title: string;
  children: React.ReactNode;
};

const flowNode: React.FC<NodeProps<Node<NodeDataProps, 'FlowNode'>>> = props => {
  const { data } = props;

  return (
    <main>
      <Handle type="target" position={Position.Top} />
      <SuiCard>
        <SuiCardHeader>
          <SuiCardTitle>{data.title}</SuiCardTitle>
        </SuiCardHeader>
        <SuiCardContent>{data.children}</SuiCardContent>
      </SuiCard>
      <Handle type="source" position={Position.Bottom} />
    </main>
  );
};

export default flowNode;
