import { Message } from './Message';
import InternalMessage, { InternalMessageProps } from './message-context';
import { MessageConfig } from './interface';

let message: Message | null = null;

export default (config?: MessageConfig) => {
  if (!message) {
    message = new Message(
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
  }
  return message;
};
