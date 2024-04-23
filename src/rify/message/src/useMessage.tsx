import { Message } from './Message';
import InternalMessage, { InternalMessageProps } from './message-context';
import { MessageConfig } from './interface';

const message = new Message(
  Object.assign(
    {
      clsPrefix: 'rify',
      placement: 'top',
      duration: 3000,
    } as MessageConfig,
    config,
  ),
  (props: InternalMessageProps) => {
    return <InternalMessage {...props}></InternalMessage>;
  },
);
export default (config?: MessageConfig) => {
  if (config) message.config(config);
  return message;
};
