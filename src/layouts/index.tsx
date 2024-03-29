import { Suspense } from 'react';
import { RouteObject, RouteRecord } from 'react-router-dom';
import records, { ErrorElement } from '@/routes';
import SuspenseFallback from './SuspenseFallback';

const syncRouter = (raws: RouteRecord[]): RouteObject[] => {
  const routes: Array<RouteObject> = [];
  raws.map((raw: RouteRecord) => {
    routes.push({
      id: raw.name,
      path: raw.path,
      element: (
        <Suspense fallback={SuspenseFallback({})}>
          <raw.component />
        </Suspense>
      ),
      children: raw.children && syncRouter(raw.children),
      errorElement: (
        <Suspense fallback={SuspenseFallback({})}>
          <ErrorElement />
        </Suspense>
      ),
    });
  });
  return routes;
};

export const routes: RouteObject[] = syncRouter(records);
