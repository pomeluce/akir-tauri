import { Loading } from './Loading';
import { LoadingProps } from './loading';

export default (config?: LoadingProps) => {
  return new Loading(config);
};

export { Loading } from './Loading';
export type { LoadingProps } from './loading';
