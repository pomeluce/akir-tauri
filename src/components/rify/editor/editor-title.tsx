import { ReactNode } from 'react';
import { Menu, OptionType } from '@/components';
import { EditorBarItemType } from './editor-item';

export interface EditorTitleProps {
  icon: ReactNode;
  title: string;
  item: EditorBarItemType[];
}

const EditorTitle: React.FC<EditorTitleProps> = ({ icon, title, item }) => {
  const [tooltipTitle, setTitle] = useState<string>(title);

  const list: OptionType[] = item.map((value, index) => ({
    key: index.toString(),
    icon: value.icon,
    label: value.title,
    onClick: () => {
      value.title && setTitle(value.title);
      value.action?.();
    },
    className: `${value.isActive && value.isActive() ? 'menu-item is-active' : ''}`,
  }));

  return (
    <ArcoDropdown trigger="click" droplist={Menu({ className: 'editor-drop-menu', options: list })} position="bottom">
      <ArcoTooltip mini position="bottom" content={tooltipTitle}>
        <button className="menu-item">{item.filter(value => value.isActive?.())[0].icon || icon}</button>
      </ArcoTooltip>
    </ArcoDropdown>
  );
};

export default EditorTitle;
