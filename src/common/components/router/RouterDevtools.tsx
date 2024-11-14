import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const RouterDevtools = __DEV__ ? TanStackRouterDevtools : () => null;
