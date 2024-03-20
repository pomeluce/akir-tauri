import { ReactNode } from 'react';
import { ProviderContext } from './context';
import { GlobalTheme, GlobalThemeOverrides } from './interface';

export interface ConfigProviderProps {
  clsPrefix?: String;
  theme?: GlobalTheme;
  themeOverrides?: GlobalThemeOverrides;
  children?: ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = (props: ConfigProviderProps) => {
  return <ProviderContext.Provider value={props}>{props.children}</ProviderContext.Provider>;
};

export default ConfigProvider;
