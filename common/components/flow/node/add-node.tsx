import { Handle, Position } from '@xyflow/react';

const addNode: React.FC<{}> = () => {
  return (
    <main>
      <Handle style={{ backgroundColor: 'transparent', borderWidth: 0 }} type="target" position={Position.Top} />
      <div className="w-10 h-10 bg-backdrop2 rounded flex justify-center items-center text-sm drop-shadow-md">
        <SuiDropdownMenu>
          <SuiDropdownMenuTrigger asChild>
            <span className="text-primary5 cursor-pointer">
              <IconRiAddLine />
            </span>
          </SuiDropdownMenuTrigger>
          <SuiDropdownMenuContent className="w-64 p-5 flex flex-col gap-3">
            <SuiDropdownMenuItem asChild inset className="border border-rim3 rounded">
              <div className="flex justify-between items-center">
                <section className="flex items-center gap-3">
                  <span className="bg-primary3 text-white rounded-xl px-3 py-2">
                    <IconRiNotification4Line />
                  </span>
                  <span>消息通知</span>
                </section>
                <IconRiDraggable />
              </div>
            </SuiDropdownMenuItem>
            <SuiDropdownMenuItem asChild inset className="border border-rim3 rounded">
              <div className="flex justify-between items-center">
                <section className="flex items-center gap-3">
                  <span className="bg-primary3 text-white rounded-xl px-3 py-2">
                    <IconRiNotification4Line />
                  </span>
                  <span>人员审批</span>
                </section>
                <IconRiDraggable />
              </div>
            </SuiDropdownMenuItem>
          </SuiDropdownMenuContent>
        </SuiDropdownMenu>
      </div>
    </main>
  );
};

export default addNode;
