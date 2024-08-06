import { BaseEdge, Edge, EdgeLabelRenderer, EdgeProps, getStraightPath, useReactFlow } from '@xyflow/react';

const flowEdge: React.FC<EdgeProps<Edge>> = props => {
  const { id, sourceX, sourceY, targetX, targetY } = props;
  const { setEdges } = useReactFlow();
  const [path, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  return (
    <>
      <BaseEdge id={id} path={path} />
      <EdgeLabelRenderer>
        <SuiButton
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onClick={() => {
            setEdges(es => es.filter(e => e.id !== id));
          }}
          variant="outline"
        >
          delete
        </SuiButton>
      </EdgeLabelRenderer>
    </>
  );
};

export default flowEdge;
