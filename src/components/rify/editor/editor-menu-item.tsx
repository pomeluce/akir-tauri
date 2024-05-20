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
    <button className={`menu-item${isActive && isActive() ? ' is-active' : ''}`} onClick={action} title={title}>
      {icon}
    </button>
  );
};

export default EditorBarItem;
