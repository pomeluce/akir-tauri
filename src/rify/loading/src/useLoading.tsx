import { Spin, SpinProps } from '../../spin';
import { Loading } from './Loading';
import { LoadOptions } from './interface';

const spin = (props: SpinProps) => <Spin {...props}> </Spin>;

export default (config?: LoadOptions) => {
  return new Loading(Object.assign({ bgColor: 'rgba(0, 0, 0, 0.45)', isShow: true, zIndex: 1000 }, config), document.createElement('div'), spin);
};
