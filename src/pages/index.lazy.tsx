import { AkirMarkEditor } from '@/components';

export const Route = createLazyFileRoute('/')({
  component: () => {
    return (
      <main className="flex flex-col justify-center items-center">
        <AkirMarkEditor />
      </main>
    );
  },
});
