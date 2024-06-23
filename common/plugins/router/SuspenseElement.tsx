import { FC, ReactNode, Suspense } from 'react';

const SuspenseElement: FC<{ fallback?: ReactNode; children: () => Promise<{ default: FC<{}> }> }> = ({ fallback, children }) => {
  const LazyComponent = lazy(children);
  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
};

export default SuspenseElement;
