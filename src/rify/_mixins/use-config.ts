import { ProviderContext } from '../provider';

export const defaultClsPrefix = 'rify';

export default (): { mergedClsPrefix: string } => {
  const { clsPrefix } = useContext(ProviderContext);
  return {
    mergedClsPrefix: clsPrefix || defaultClsPrefix,
  };
};
