import { ReactNode } from 'react';
import { Menu, OptionType } from '@/components';
import { EditorBarItemType } from './editor-item';

export interface EditorDropmenuProps {
  icon: ReactNode;
  title: string;
  item: (EditorBarItemType & { disabled?: boolean })[];
  showIcon?: boolean;
}

const EditorDropmenu: React.FC<EditorDropmenuProps> = ({ icon, title, item, showIcon = true }) => {
  const [tooltipTitle, setTitle] = useState<string>(title);

  const list: OptionType[] = item.map((value, index) => ({
    key: index.toString(),
    icon: value.icon,
    label: value.title,
    onClick: () => {
      value.title && setTitle(value.title);
      value.action?.();
    },
    disabled: value.disabled,
    className: `${value.isActive && value.isActive() ? `menu-item is-active ${value.className}` : `${value.className}`}`,
  }));

  return (
    <ArcoDropdown trigger="click" droplist={Menu({ className: 'editor-drop-menu', options: list })} position="bottom">
      <ArcoTooltip mini position="bottom" content={tooltipTitle}>
        <button className="flex items-center rounded p-1 hover:bg-fill3">
          {item.filter(value => value.isActive?.())?.[0]?.[showIcon ? 'icon' : 'title'] || (showIcon ? icon : title)}
          <IconArrowDownSFill size={16} />
        </button>
      </ArcoTooltip>
    </ArcoDropdown>
  );
};

export default EditorDropmenu;
