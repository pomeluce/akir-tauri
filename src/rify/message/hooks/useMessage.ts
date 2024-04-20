import { MessageApiInjection, MessageContext, MessageProviderSetupProps } from '../src/message-context';
import { throwError } from '../../_utils';

export default (): MessageApiInjection => {
  const { api } = useContext<MessageProviderSetupProps>(MessageContext);
  if (!Object.keys(api).length) {
    throwError('useMessage', 'No outer <rify-message-provider /> founded.');
  }
  return api;
};
