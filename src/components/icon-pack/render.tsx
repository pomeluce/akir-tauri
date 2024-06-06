import { IIconProps, Icon } from '@icon-park/react/lib/runtime';

const render: React.FC<{ name: Icon } & IIconProps> = ({ name: Name, ...props }) => {
  return <Name {...props} />;
};

export default render;
