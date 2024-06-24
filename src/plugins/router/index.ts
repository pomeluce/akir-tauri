import { createRouter } from '@common/plugins';
import routes, { ErrorElement as errorElement } from '@/routes';
import beforeEach from './guard';

const router = createRouter({ routes, errorElement });
router.beforeEach(beforeEach);

export default router;
