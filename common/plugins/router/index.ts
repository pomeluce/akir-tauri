import { FC } from 'react';
import { createBrowserRouter, RouteObject, RouteRecord, RouterGuard } from 'react-router-dom';
import SuspenseElement from './SuspenseElement';
import SuspenseFallback from './SuspenseFallback';
import RouterHandler, { RouterHandlerType } from './router-handler';

const syncRouter = (raws: RouteRecord[], errorElement: () => Promise<{ default: FC<{}> }>): RouteObject[] => {
  const routes: Array<RouteObject> = [];
  raws.map((raw: RouteRecord) => {
    routes.push({
      id: raw.name,
      path: raw.path,
      element: SuspenseElement({ fallback: SuspenseFallback({}), children: raw.component }),
      children: raw.children && syncRouter(raw.children, errorElement),
      errorElement: SuspenseElement({ fallback: SuspenseFallback({}), children: errorElement }),
    });
  });
  return routes;
};

const createRouter = ({ routes, errorElement, beforeEach }: { routes: RouteRecord[]; errorElement: () => Promise<{ default: FC<{}> }>; beforeEach?: RouterGuard }) => {
  return RouterHandler(createBrowserRouter(syncRouter(routes, errorElement)), routes, beforeEach) as RouterHandlerType;
};
export { default as RouterProvider } from './RouterProvider';
export { default as ProtectedRouter } from './ProtectedRouter';

export default createRouter;
