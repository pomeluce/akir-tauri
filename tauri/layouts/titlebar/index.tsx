import ButtonGroup from './button-group';
import MenuGroup from './menu-group';

const titlebar: React.FC<{}> = () => {
  return (
    <div data-tauri-drag-region className="flex items-center gap-3 px-2 py-1.5">
      <ButtonGroup />
      <MenuGroup />
    </div>
  );
};

export default titlebar;
