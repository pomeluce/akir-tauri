import { Spin, SpinProps } from '../spin';
import { RifyLoad } from './Load';
import { LoadOptions } from './interface';

const spin = (props: SpinProps) => (
  <Spin {...props}>
    <span></span>
  </Spin>
);

export default (config: LoadOptions = { bgColor: 'rgba(0, 0, 0, 0.45)', isShow: true, zIndex: 1000 }) => {
  return new RifyLoad(config, document.createElement('div'), spin);
};
