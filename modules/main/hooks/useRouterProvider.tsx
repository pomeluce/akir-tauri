import { E404, E500 } from '@main/components';
import { routeTree } from '@main/routeTree.gen';

export const router = createRouter({
  routeTree,
  context: { auth: undefined! },
  defaultNotFoundComponent: E404,
  defaultErrorComponent: E500,
});

export const useRouterProvider = () => {
  const auth = useAuth();
  const AppRouterProvider = () => {
    return <RouterProvider router={router} context={{ auth }} />;
  };

  return { AppRouterProvider };
};
