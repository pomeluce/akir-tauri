import { Dialog } from '@common/shadcn';
import { createRoot } from 'react-dom/client';

export const SuiConfirm = (props: React.ComponentProps<typeof Dialog>) => {
  const container = document.createElement('div');
  const root = createRoot(container);
  container.remove();
  root.render(<Dialog {...props} />);
};
