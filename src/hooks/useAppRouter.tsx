import { E404, E500 } from '@/components';
import { routeTree } from '@/routeTree.gen';

export const router = createRouter({
  routeTree,
  context: { auth: undefined! },
  defaultNotFoundComponent: E404,
  defaultErrorComponent: E500,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const useAppRouter = () => {
  const auth = useAuth();
  const AppRouterProvider = () => {
    return <RouterProvider router={router} context={{ auth }} />;
  };

  return { AppRouterProvider };
};
