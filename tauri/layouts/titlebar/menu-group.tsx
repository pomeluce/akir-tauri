import { ThemePopup } from '@common/components';
import { About, Pushpin } from '@tauri/components';

const menuGroup: React.FC<{}> = () => {
  return (
    <main className="flex items-center ml-auto text-word2">
      <Pushpin />
      <ThemePopup />
      <About />
    </main>
  );
};

export default menuGroup;
