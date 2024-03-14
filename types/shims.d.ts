import type { AttributifyAttributes } from '@unocss/preset-attributify';

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {
    bg?: string;
    border?: string;
    box?: string;
    flex?: boolean;
    font?: string;
    opacity?: string;
    p?: string;
    text?: string;
  }
}
