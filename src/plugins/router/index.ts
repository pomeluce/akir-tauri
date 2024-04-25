import { createBrowserRouter } from 'react-router-dom';
import { routes } from '@/layouts';

export default createBrowserRouter(routes);
export { default as beforeEach } from './guard';
export { default as ProtectedRouter } from './ProtectedRouter';
