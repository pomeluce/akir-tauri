import { AlertDialog, Dialog } from '@common/shadcn';
import { createRoot } from 'react-dom/client';

const container = document.createElement('div');
const root = createRoot(container);

export default {
  confirm(props: React.ComponentProps<typeof Dialog>) {
    root.render(<Dialog key={`${Date.now()}`} {...props} />);
    return { close: () => root.unmount() };
  },

  alert(props: React.ComponentProps<typeof AlertDialog>) {
    root.render(<AlertDialog key={`${Date.now()}`} {...props} />);
    return { close: () => root.unmount() };
  },
};
