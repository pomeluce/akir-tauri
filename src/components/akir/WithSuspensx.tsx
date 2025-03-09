import { FC, ReactNode, Suspense } from 'react';
import SuspenseFallback from './SuspenseFallback';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const WithSuspense: FC<Props> = ({ children }) => {
  return (
    <div>
      <Suspense fallback={SuspenseFallback()}>{children}</Suspense>
    </div>
  );
};
