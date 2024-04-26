import { ReactNode } from 'react';
import { ProviderContext } from './context';
import { GlobalTheme, GlobalThemeOverrides } from './interface';
import { RtlEnabledStae } from './internal-interface';
import useProviderStore from './hooks/useProviderStore';

export interface ConfigProviderProps {
  clsPrefix?: string;
  theme?: GlobalTheme;
  themeOverrides?: GlobalThemeOverrides;
  direction?: 'ltr' | 'rtl' | RtlEnabledStae;
  children?: ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = (props: ConfigProviderProps) => {
  const store = useProviderStore();
  useEffect(() => {
    store.setContext(props);
  }, [props]);
  return <ProviderContext.Provider value={props}>{props.children}</ProviderContext.Provider>;
};

export default ConfigProvider;
