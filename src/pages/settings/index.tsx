import { General, Keymap, UI } from './-settings';

export const Route = createFileRoute('/settings/')({
  component: () => {
    return (
      <main className="columns-1 lg:columns-2 -mt-3 *:mt-3 gap-3 px-5 overflow-scroll">
        <General />
        <UI />
        <Keymap />
      </main>
    );
  },
});
