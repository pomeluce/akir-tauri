import { MessageApiInjection, MessageContext, MessageProviderSetupProps } from '../src/message-context';
import { throwError } from '../../_utils';

export default (): MessageApiInjection => {
  const { api: MessageApi } = useContext<MessageProviderSetupProps>(MessageContext);
  if (!Object.keys(MessageApi).length) {
    throwError('useMessage', 'No outer <rify-message-provider /> founded.');
  }
  return MessageApi;
};
