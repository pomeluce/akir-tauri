import { ReactNode } from 'react';
import { ProviderContext } from './context';
import { GlobalTheme, GlobalThemeOverrides } from './interface';
import { RtlEnabledStae } from './internal-interface';
import { defaultProps } from './config';
import { EventBus } from '../_utils';

export interface ConfigProviderProps {
  clsPrefix?: string;
  theme?: GlobalTheme;
  themeOverrides?: GlobalThemeOverrides;
  direction?: 'ltr' | 'rtl' | RtlEnabledStae;
  children?: ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = (props: ConfigProviderProps) => {
  useEffect(() => {
   const bus = EventBus.publish<ConfigProviderProps>('RifyConfigProvider', props);
    return () => {
      bus.unsubscribe();
    };
  }, [props]);
  return <ProviderContext.Provider value={props}>{props.children}</ProviderContext.Provider>;
};

ConfigProvider.defaultProps = defaultProps;

export default ConfigProvider;
