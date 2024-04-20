import { ReactNode } from 'react';
import { ProviderContext } from './context';
import { GlobalTheme, GlobalThemeOverrides } from './interface';
import { RtlEnabledStae } from './internal-interface';
import { defaultProps } from './config';

export interface ConfigProviderProps {
  clsPrefix?: string;
  theme?: GlobalTheme;
  themeOverrides?: GlobalThemeOverrides;
  direction?: 'ltr' | 'rtl' | RtlEnabledStae;
  children?: ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = (props: ConfigProviderProps) => {
  return <ProviderContext.Provider value={props}>{props.children}</ProviderContext.Provider>;
};

ConfigProvider.defaultProps = defaultProps;

export default ConfigProvider;
