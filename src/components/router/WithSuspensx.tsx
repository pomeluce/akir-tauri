import { ReactNode, Suspense } from 'react';
import SuspenseFallback from './SuspenseFallback';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const WithSuspense = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div ref={ref}>
      <Suspense fallback={SuspenseFallback({})}>{children}</Suspense>
    </div>
  );
});
