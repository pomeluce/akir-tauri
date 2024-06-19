import { IconType, IconBaseProps } from 'react-icons/lib';

const render: React.FC<{ name: IconType } & IconBaseProps> = ({ name: Name, ...props }) => {
  return <Name {...props} />;
};

export default render;
