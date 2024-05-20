export interface EditorBarItemProps {
  icon: React.ReactNode;
  title: string;
  action: () => boolean;
  type?: string;
  isActive?: () => boolean;
}

const EditorBarItem: React.FC<EditorBarItemProps> = props => {
  const { icon, title, action, isActive } = props;

  return (
    <ArcoTooltip position="bottom" content={title}>
      <button className={`menu-item${isActive && isActive() ? ' is-active' : ''}`} onClick={action}>
        {icon}
      </button>
    </ArcoTooltip>
  );
};

export default EditorBarItem;
