import { RouterProvider as Provider } from 'react-router-dom';
import { RouterContext } from './router-context';
import { RouterHandler } from './router-handler';

const RouterProvider: React.FC<{ router: RouterHandler }> = ({ router }) => {
  return (
    <RouterContext.Provider value={{ router }}>
      <Provider router={router.root} />
    </RouterContext.Provider>
  );
};

export default RouterProvider;
