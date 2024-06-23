import { RouterProvider as Provider } from 'react-router-dom';
import { RouterContext } from './router-context';
import createRouter from '.';

const RouterProvider: React.FC<{ router: ReturnType<typeof createRouter> }> = ({ router }) => {
  return (
    <RouterContext.Provider value={{ router }}>
      <Provider router={router.root} />
    </RouterContext.Provider>
  );
};

export default RouterProvider;
