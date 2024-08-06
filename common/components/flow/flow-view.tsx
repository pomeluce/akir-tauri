import { ReactFlow, MiniMap, Controls, useNodesState, useEdgesState, addEdge, Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FlowNode from './flow-node';
import FlowEdge from './flow-edge';

const initialNodes = [
  { id: '1', type: 'FlowNode', position: { x: 100, y: 0 }, data: { title: 'Dooring' } },
  { id: '2', type: 'FlowNode', position: { x: 0, y: 200 }, data: { title: 'Flow' } },
  { id: '3', type: 'FlowNode', position: { x: 200, y: 200 }, data: { title: 'Nocode/WEP' } },
];
const initialEdges = [
  { id: 'e1-2', type: 'FlowEdge', source: '1', target: '2' },
  { id: 'e1-3', type: 'FlowEdge', source: '1', target: '3' },
];
const flowView: React.FC<{}> = () => {
  const { theme } = useTheme();

  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges(eds => addEdge({ ...params, type: 'FlowEdge' }, eds)), [setEdges]);

  const types = useMemo(() => ({ node: { FlowNode }, edge: { FlowEdge } }), []);

  return (
    <div style={{ width: '100%', height: '70vh' }}>
      <ReactFlow
        colorMode={theme}
        nodes={nodes}
        edges={edges}
        nodeTypes={types.node}
        edgeTypes={types.edge}
        proOptions={{ hideAttribution: true }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default flowView;
