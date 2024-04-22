import { Spin, SpinProps } from '../spin';
import { RifyLoad } from './Load';
import { LoadOptions } from './interface';

const spin = (props: SpinProps) => <Spin {...props}> </Spin>;

export default (config?: LoadOptions) => {
  return new RifyLoad(Object.assign({ bgColor: 'rgba(0, 0, 0, 0.45)', isShow: true, zIndex: 1000 }, config), document.createElement('div'), spin);
};
