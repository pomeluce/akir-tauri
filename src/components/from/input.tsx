import { RefAttributes } from 'react';

interface InputProps {
  type?: 'text' | 'password';
  placeholder?: string;
  clearable?: boolean;
  value?: string;
}

const input: React.ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>> = forwardRef((props, ref) => {
  const { type = 'text', placeholder, clearable, value } = props;
  return <input ref={ref} type={type} placeholder={placeholder} value={value}></input>;
});

export default input;
