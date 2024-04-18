import { throwError } from '../../_utils';
import { MessageApiInjection, MessageContext, MessageProviderSetupProps } from '../src/message-context';

export default (): MessageApiInjection => {
  const { api } = useContext<MessageProviderSetupProps>(MessageContext);
  if (api === null) {
    throwError('useMessage', 'No outer <rify-message-provider /> founded.');
  }
  return api;
};
