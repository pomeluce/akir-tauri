import { Menu, OptionType } from '@/components';

export interface EditorBarItemType {
  icon?: React.ReactNode;
  title?: string;
  type?: string;
  action?: () => boolean;
  isActive?: () => boolean;
}

const EditorBarItem: React.FC<{ item: EditorBarItemType | EditorBarItemType[] }> = ({ item }) => {
  if (Array.isArray(item)) {
    const list: OptionType[] = item.map((value, index) => ({
      key: index.toString(),
      icon: value.icon,
      label: value.title,
      onClick: value.action,
      className: `${value.isActive && value.isActive() ? 'menu-item is-active' : ''}`,
    }));

    return (
      <ArcoDropdown trigger="hover" droplist={Menu({ className: 'editor-drop-menu', options: list })} position="bottom">
        <button className="menu-item">
          <IconMoreLine />
        </button>
      </ArcoDropdown>
    );
  }

  const { icon, title, action, isActive } = item;

  return (
    <ArcoTooltip mini position="bottom" content={title}>
      <button className={`menu-item${isActive && isActive() ? ' is-active' : ''}`} onClick={action}>
        {icon}
      </button>
    </ArcoTooltip>
  );
};

export default EditorBarItem;
