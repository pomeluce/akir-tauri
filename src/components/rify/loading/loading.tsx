import { Load } from '@/components';

export interface LoadingProps {
  content?: string;
  color?: string;
  bgColor?: string;
}

const loading: React.FC<LoadingProps> = props => {
  return (
    <div
      className="w-screen h-screen fixed inset-0 flex flex-col gap-2 justify-center items-center text-primary6 z-100"
      style={{ backgroundColor: props.bgColor || 'rgba(var(--hue-bg-2), 0.45)', color: props.color }}
    >
      <div className="relative w-10 h-10" role="img" aria-label="loading">
        <div className="absolute w-full h-full">
          <div className="animate-spin animate-duration-3000">
            <Load className="w-10" strokeWidth={20} />
          </div>
        </div>
      </div>
      {props.content && <span>{props.content}</span>}
    </div>
  );
};

export default loading;
