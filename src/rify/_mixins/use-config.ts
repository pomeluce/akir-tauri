import { ConfigProviderProps, ProviderContext, defaultClsPrefix } from '../provider';

export const useConfig = (context?: ConfigProviderProps): { mergedClsPrefix: string; mergedRtl: typeof direction } => {
  const { clsPrefix, direction } = context || useContext(ProviderContext);
  return {
    mergedClsPrefix: clsPrefix || defaultClsPrefix,
    mergedRtl: direction || 'ltr',
  };
};
