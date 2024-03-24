import { ProviderContext, defaultClsPrefix } from '../provider';

export const useConfig = (): { mergedClsPrefix: string; mergedRtl: typeof direction } => {
  const { clsPrefix, direction } = useContext(ProviderContext);
  return {
    mergedClsPrefix: clsPrefix || defaultClsPrefix,
    mergedRtl: direction || 'ltr',
  };
};
