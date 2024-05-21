import { ColorPicker, ColorPickerProps } from '../color';

const EditorColor: React.FC<ColorPickerProps & { icon: React.ReactNode }> = ({ icon, defaultColor, onChange }) => {
  const [visable, setVisable] = useState<boolean>(false);
  const handleChange = (color: string) => {
    setVisable(false);
    onChange?.(color);
  };
  return (
    <ArcoTrigger popupVisible={visable} onClickOutside={() => setVisable(false)} trigger="click" popup={() => ColorPicker({ defaultColor, onChange: handleChange })}>
      <button className="menu-item" onClick={() => setVisable(true)}>
        <ArcoTooltip mini position="bottom" content="文字颜色">
          {icon}
        </ArcoTooltip>
      </button>
    </ArcoTrigger>
  );
};

export default EditorColor;
