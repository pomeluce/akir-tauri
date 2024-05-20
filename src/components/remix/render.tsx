type AllSVGProps = React.SVGProps<SVGSVGElement>;
type ReservedProps = 'color' | 'size' | 'width' | 'height' | 'fill' | 'viewBox';
interface RemixiconProps extends Pick<AllSVGProps, Exclude<keyof AllSVGProps, ReservedProps>> {
  color?: string;
  size?: number | string;
  children?: never;
}

const render: React.FC<{ name: React.ComponentType<RemixiconProps>; props?: RemixiconProps }> = ({ name, props }) => {
  const Name = name;
  return <Name {...props} />;
};

export default render;
