import { ReactNode } from 'react';
import SuspenseFallback from './SuspenseFallback';
import { RouterContext } from './router-context';

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const { router } = useContext(RouterContext);
  const { context: to, fullPath, beforeEach } = router;

  const [guard, setGuard] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setGuard((await beforeEach?.(to)) || true);
  }, [fullPath]);

  return guard ? children : SuspenseFallback({});
};

export default ProtectedRouter;
