import { ReactNode } from 'react';
import { MatcherLocation, NavigationGuardReturn } from 'react-router-dom';
import { RouterContext } from './router-context';
import SuspenseFallback from './SuspenseFallback';
import { omit } from 'lodash-es';

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const { router } = useContext(RouterContext);
  const { record, routerGuard, root, resolve, matchName } = router;

  const [guard, setGuard] = useState<boolean>(false);

  useAsyncEffect(async () => {
    const result = routerGuard?.(omit(record.route, ['component']) as MatcherLocation);
    const to = (rs: NavigationGuardReturn) => {
      if (rs instanceof Error) throw new Error(rs.message);
      if (typeof rs === 'string' || typeof rs === 'object') {
        root.navigate(typeof rs === 'string' ? rs : resolve(matchName(rs.name)).fullPath);
      }
      setGuard(true);
    };
    result instanceof Promise ? result.then(rs => to(rs)) : to(result);
  }, [record.fullPath]);

  return guard ? children : SuspenseFallback({});
};

export default ProtectedRouter;
