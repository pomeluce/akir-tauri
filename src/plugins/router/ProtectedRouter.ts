import { ReactNode } from 'react';
import { beforeEach } from '.';

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const { context: to } = useRouter();
  
  useEffect(() => {
    beforeEach(to);
  }, []);

  return children;
};

export default ProtectedRouter;
