import { About, Pushpin } from '@tauri/components';

const menuGroup: React.FC<{}> = () => {
  return (
    <main className="flex items-center gap-3 ml-auto text-word2">
      <Pushpin />
      <About />
    </main>
  );
};

export default menuGroup;
