import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const RouterDevtools = __DEV__ ? TanStackRouterDevtools : () => null;
