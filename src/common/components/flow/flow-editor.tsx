import { ReactFlow, MiniMap, Controls, useNodesState, useEdgesState, addEdge, Connection, Background, BackgroundVariant } from '@xyflow/react';
import StartNode from './node/start-node';
import AddNode from './node/add-node';

import '@xyflow/react/dist/style.css';

const flowEditor: React.FC<{}> = () => {
  const { theme } = useTheme();

  const initialNodes = [
    { id: 'start', type: 'StartNode', position: { x: 0, y: 0 }, data: {} },
    { id: 'add', type: 'AddNode', position: { x: 28, y: 200 }, data: {} },
  ];

  const initialEdges = [{ id: 'start-add', type: 'smoothstep', source: 'start', target: 'add' }];

  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges(eds => addEdge({ ...params, type: 'FlowEdge' }, eds)), [setEdges]);

  const types = useMemo(() => ({ node: { StartNode, AddNode }, edge: {} }), []);

  return (
    <main className="w-full h-70vh bg-fill2 rounded">
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
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </main>
  );
};

export default flowEditor;
