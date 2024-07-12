import { ThemePopup } from '@common/components';
import About from './about';

const menuGroup: React.FC<{}> = () => {
  return (
    <main className="flex items-center ml-auto text-word2">
      <ThemePopup />
      <About />
    </main>
  );
};

export default menuGroup;
