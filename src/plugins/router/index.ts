import { createRouter } from '@common/plugins';
import routes, { ErrorElement as errorElement } from '@/routes';
import beforeEach from './guard';

const router = createRouter({ routes, errorElement });

export default router;
router.beforeEach = beforeEach;
