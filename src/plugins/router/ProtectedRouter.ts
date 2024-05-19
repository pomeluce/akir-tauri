import { ReactNode } from 'react';
import { beforeEach } from '.';
import SuspenseFallback from '@/layouts/SuspenseFallback';

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const { context: to, fullPath } = useRouter();

  const [guard, setGuard] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setGuard(await beforeEach(to));
  }, [fullPath]);

  return guard ? children : SuspenseFallback({});
};

export default ProtectedRouter;
