import { ProviderContext } from './context';
import { ConfigProviderProps } from './interface';

const ConfigProvider: React.FC<ConfigProviderProps> = (props: ConfigProviderProps) => {
  return <ProviderContext.Provider value={props}>{props.children}</ProviderContext.Provider>;
};

export default ConfigProvider;
