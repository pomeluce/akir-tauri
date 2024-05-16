import { Load } from '@/components/icons';

const fallback: React.FC<{}> = () => {
  return (
    <div className="w-screen h-screen fixed inset-0 flex justify-center items-center text-4xl text-primary6 bg-backdrop2 opacity-85 z-100">
      <div className="relative leading-0 w-[1em] h-[1em]" role="img" aria-label="loading">
        <div className="absolute w-full h-full">
          <div className="animate-spin [animate-duration:3s]">
            <Load className="w-[1em] h-[1em]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default fallback;
