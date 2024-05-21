export interface ColorPickerProps {
  defaultColor: string;
  onChange?: (color: string) => void;
}

const colorPicker: React.FC<ColorPickerProps> = ({ defaultColor, onChange }) => {
  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const selectColor = (event.currentTarget.attributes.getNamedItem('data-value') as Attr).value;
    onChange?.(selectColor);
  };

  const colors = [
    'rgb(0, 0, 0)',
    'rgb(38, 38, 38)',
    'rgb(89, 89, 89)',
    'rgb(140, 140, 140)',
    'rgb(191, 191, 191)',
    'rgb(217, 217, 217)',
    'rgb(233, 233, 233)',
    'rgb(245, 245, 245)',
    'rgb(250, 250, 250)',
    'rgb(255, 255, 255)',
    'rgb(225, 60, 57)',
    'rgb(231, 95, 51)',
    'rgb(235, 144, 58)',
    'rgb(245, 219, 77)',
    'rgb(114, 192, 64)',
    'rgb(89, 191, 192)',
    'rgb(66, 144, 247)',
    'rgb(54, 88, 226)',
    'rgb(106, 57, 201)',
    'rgb(216, 68, 147)',
    'rgb(251, 233, 230)',
    'rgb(252, 237, 225)',
    'rgb(252, 239, 212)',
    'rgb(252, 251, 207)',
    'rgb(231, 246, 213)',
    'rgb(218, 244, 240)',
    'rgb(217, 237, 250)',
    'rgb(224, 232, 250)',
    'rgb(237, 225, 248)',
    'rgb(246, 226, 234)',
    'rgb(255, 163, 158)',
    'rgb(255, 187, 150)',
    'rgb(255, 213, 145)',
    'rgb(255, 251, 143)',
    'rgb(183, 235, 143)',
    'rgb(135, 232, 222)',
    'rgb(145, 213, 255)',
    'rgb(173, 198, 255)',
    'rgb(211, 173, 247)',
    'rgb(255, 173, 210)',
    'rgb(255, 77, 79)',
    'rgb(255, 122, 69)',
    'rgb(255, 169, 64)',
    'rgb(255, 236, 61)',
    'rgb(115, 209, 61)',
    'rgb(54, 207, 201)',
    'rgb(64, 169, 255)',
    'rgb(89, 126, 247)',
    'rgb(146, 84, 222)',
    'rgb(247, 89, 171)',
    'rgb(207, 19, 34)',
    'rgb(212, 56, 13)',
    'rgb(212, 107, 8)',
    'rgb(212, 177, 6)',
    'rgb(56, 158, 13)',
    'rgb(8, 151, 156)',
    'rgb(9, 109, 217)',
    'rgb(29, 57, 196)',
    'rgb(83, 29, 171)',
    'rgb(196, 29, 127)',
    'rgb(130, 0, 20)',
    'rgb(135, 20, 0)',
    'rgb(135, 56, 0)',
    'rgb(97, 71, 0)',
    'rgb(19, 82, 0)',
    'rgb(0, 71, 79)',
    'rgb(0, 58, 140)',
    'rgb(6, 17, 120)',
    'rgb(34, 7, 94)',
    'rgb(120, 6, 80)',
  ];
  return (
    <div className="p-2 bg-backdrop2 border border-rim2 rounded shadow-lg z-50">
      <ul className="w-[220px] flex flex-wrap gap-y-1.5">
        <li
          className="flex justify-start items-center gap-1 px-0.5 w-full text-word1 cursor-pointer rounded border border-transparent hover:border-rim4"
          onClick={() => onChange?.(defaultColor)}
        >
          <IconCheckboxIndeterminateLine size={18} />
          <span>默认颜色</span>
        </li>
        {colors.map((color, index) => (
          <li className="inline-block p-0.5 cursor-pointer rounded border border-transparent hover:border-rim4" data-value={color} key={index} onClick={handleClick}>
            <div className="w-4 h-4 rounded border border-fill3" style={{ backgroundColor: color }}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default colorPicker;
