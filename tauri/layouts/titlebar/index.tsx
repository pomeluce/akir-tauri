import MenuGroup from './menu-group';

const titlebar: React.FC<{}> = () => {
  return (
    <div data-tauri-drag-region className="w-full flex items-center gap-7 p-2 border-b border-rim2">
      <MenuGroup />
    </div>
  );
};

export default titlebar;
