import { FC } from 'react';
import { createBrowserRouter, RouteObject, RouteRecord } from 'react-router-dom';
import SuspenseElement from './SuspenseElement';
import SuspenseFallback from './SuspenseFallback';
import { RouterHandler } from './router-handler';

const syncRouter = (raws: RouteRecord[], errorElement?: () => Promise<{ default: FC<{}> }>): RouteObject[] => {
  const routes: Array<RouteObject> = [];
  raws.map((raw: RouteRecord) => {
    routes.push({
      id: raw.name,
      path: raw.path,
      element: SuspenseElement({ fallback: SuspenseFallback({}), children: raw.component }),
      children: raw.children && syncRouter(raw.children, errorElement),
      errorElement: errorElement && SuspenseElement({ fallback: SuspenseFallback({}), children: errorElement }),
    });
  });
  return routes;
};

const createRouter = ({ routes, errorElement }: { routes: RouteRecord[]; errorElement?: () => Promise<{ default: FC<{}> }> }) => {
  return new RouterHandler(createBrowserRouter(syncRouter(routes, errorElement)), routes);
};
export { default as RouterProvider } from './RouterProvider';
export { default as ProtectedRouter } from './ProtectedRouter';

export default createRouter;
