import { Handle, Position } from '@xyflow/react';

const startNode: React.FC<{}> = () => {
  return (
    <main>
      <div className="w-24 h-10 bg-backdrop2 rounded flex justify-center items-center text-sm drop-shadow-sm">start</div>
      <Handle style={{ backgroundColor: 'transparent', borderWidth: 0 }} type="source" position={Position.Bottom} />
    </main>
  );
};

export default startNode;
