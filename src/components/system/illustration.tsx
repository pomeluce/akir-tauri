import cricle from '@/assets/images/cricle.svg';
import triangle from '@/assets/images/triangle.svg';

const illustration: React.FC<{ src?: string }> = props => {
  return (
    <div className="w-40 h-40 relative flex justify-center items-center rounded-full bg-fill2 dark:bg-fill4">
      <span className="absolute top-0 left-0 w-4 h-4">
        <img src={cricle} alt="" />
      </span>
      <span className="absolute -left-3 bottom-3 w-4 h-4">
        <img src={triangle} alt="" />
      </span>
      <span className="absolute -right-3 top-3 w-4 h-4">
        <img src={triangle} alt="" />
      </span>
      <span className="absolute right-0 bottom-0 w-4 h-4">
        <img src={cricle} alt="" />
      </span>
      <img className="w-2/3" src={props.src} alt="" />
    </div>
  );
};

export default illustration;
