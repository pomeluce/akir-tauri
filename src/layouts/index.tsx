import { Suspense } from 'react';
import { RouteObject, RouteRecord } from 'react-router-dom';
import records, { ErrorElement } from '@/routes';

const syncRouter = (raws: RouteRecord[]): RouteObject[] => {
  const routes: Array<RouteObject> = [];
  raws.map((raw: RouteRecord) => {
    routes.push({
      id: raw.name,
      path: raw.path,
      element: (
        <Suspense fallback={<span>loading...</span>}>
          <raw.component />
        </Suspense>
      ),
      children: raw.children && syncRouter(raw.children),
      errorElement: (
        <Suspense>
          <ErrorElement />
        </Suspense>
      ),
    });
  });
  return routes;
};

export const routes: RouteObject[] = syncRouter(records);
