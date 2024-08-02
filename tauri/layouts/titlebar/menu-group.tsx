import { ThemePopup } from '@common/components';
import { About, Pushpin } from '@tauri/components';

const menuGroup: React.FC<{}> = () => {
  return (
    <main className="flex items-center gap-3 ml-auto text-word2">
      <Pushpin />
      <ThemePopup
        content={theme => (
          <button className="flex justify-center items-center">{(theme === 'system' ? IconRiComputerFill : theme === 'light' ? IconRiSunFill : IconRiMoonClearFill)({})}</button>
        )}
      />
      <About />
    </main>
  );
};

export default menuGroup;
